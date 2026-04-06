import { useEffect } from "react";
import ConnectFourColumn from "./ConnectFourColumn";
import confetti from "canvas-confetti";
import { useDispatch, useSelector } from "react-redux";
import { handleDropPiece, restart, toggleGameOver, resetGameState } from "./connectFourSlice";
import {
  fetchConnectFourGame,
  createConnectFourGame,
  saveConnectFourGame,
} from "./connectFourThunks";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

export interface Column {
  counter: number;
  squares: Square[];
}

export interface Square {
  id: number;
  color: string;
}

type Mode = "pass-and-play" | "single-player" | "multiplayer";

interface Props {
  mode: Mode;
}

const ConnectFourBoard = ({ mode }: Props) => {
  const userId = useSelector((state: any) => state.user.userId);
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const isRedTurn = useSelector((state: any) => state.connectFour.isRedTurn);
  const isGameOver = useSelector((state: any) => state.connectFour.isGameOver);
  const columns = useSelector((state: any) => state.connectFour.columns);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClickColumn = (index: number, column: Column) => {
    if (isGameOver) return;
    const updatedColumns = [...columns];
    updatedColumns[index] = {
      ...updatedColumns[index],
      counter: updatedColumns[index].counter - 1,
      squares: updatedColumns[index].squares.map((s: Square) =>
        s.id === column.counter
          ? { ...s, color: isRedTurn ? "red" : "black" }
          : s
      ),
    };
    dispatch(handleDropPiece(updatedColumns));
    checkVerticalWin(updatedColumns);
    checkHorizontalWin(updatedColumns);
    checkDiagonalWin(updatedColumns);
    if (isAuthenticated) {
      dispatch(saveConnectFourGame({ userId, stuffToPatch: { columns: updatedColumns } }));
    }
  };

  const checkVerticalWin = (updatedColumns: Column[]) => {
    for (let col of updatedColumns) {
      if (col.counter > 2) continue;
      for (let i = 0; i < col.squares.length - 3; i++) {
        if (
          col.squares[i].color === col.squares[i + 1].color &&
          col.squares[i + 1].color === col.squares[i + 2].color &&
          col.squares[i + 2].color === col.squares[i + 3].color
        ) {
          dispatch(toggleGameOver());
          confetti({
            particleCount: 150,
            spread: 60,
          });
        }
      }
    }
  };

  const checkHorizontalWin = (updatedColumns: Column[]) => {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const color = updatedColumns[col].squares[row].color;
        if (
          color !== "" &&
          color === updatedColumns[col + 1].squares[row].color &&
          color === updatedColumns[col + 2].squares[row].color &&
          color === updatedColumns[col + 3].squares[row].color
        ) {
          dispatch(toggleGameOver());
          confetti({
            particleCount: 150,
            spread: 60,
          });
        }
      }
    }
  };

  const checkDiagonalWin = (updatedColumns: Column[]) => {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const color = updatedColumns[col].squares[row].color;
        if (
          color !== "" &&
          color === updatedColumns[col + 1].squares[row - 1].color &&
          color === updatedColumns[col + 2].squares[row - 2].color &&
          color === updatedColumns[col + 3].squares[row - 3].color
        ) {
          dispatch(toggleGameOver());
          confetti({
            particleCount: 150,
            spread: 60,
          });
        }
      }
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const color = updatedColumns[col].squares[row].color;
        if (
          color !== "" &&
          color === updatedColumns[col + 1].squares[row + 1].color &&
          color === updatedColumns[col + 2].squares[row + 2].color &&
          color === updatedColumns[col + 3].squares[row + 3].color
        ) {
          dispatch(toggleGameOver());
          confetti({
            particleCount: 150,
            spread: 60,
          });
        }
      }
    }
  };

  const handleRestart = () => {
    const resetColumns = Array(7).fill({
      counter: 5,
      squares: [
        { id: 0, color: "" },
        { id: 1, color: "" },
        { id: 2, color: "" },
        { id: 3, color: "" },
        { id: 4, color: "" },
        { id: 5, color: "" },
      ],
    });
    if (isAuthenticated) {
      dispatch(saveConnectFourGame({ userId, stuffToPatch: { columns: resetColumns } }));
    }
    dispatch(restart());
  };

  useEffect(() => {
    dispatch(resetGameState());
    if (isAuthenticated) {
      dispatch(fetchConnectFourGame(userId)).then((result) => {
        if (fetchConnectFourGame.fulfilled.match(result)) {
          if (
            result.payload &&
            Array.isArray(result.payload) &&
            result.payload.length === 0
          ) {
            dispatch(createConnectFourGame(userId));
          } else if (result.payload && Array.isArray(result.payload)) {
            dispatch(handleDropPiece(result.payload[0].columns));
          }
        }
      });
    }
  }, [userId, isAuthenticated, dispatch]);

  if (mode === "multiplayer") {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Connect Four</h1>
          <p className="text-gray-500 text-center mb-6">Multiplayer is coming soon.</p>
          <button
            onClick={() => navigate("/connectFour")}
            className="text-sm text-blue-500 underline cursor-pointer"
          >
            ← Back to menu
          </button>
        </div>
      </div>
    );
  }

  const turnLabel = isRedTurn ? "Red's turn" : "Black's turn";
  const showTurnIndicator = !isGameOver && mode === "pass-and-play";

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">

      {isGameOver && (
        <div className="mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-center rounded-lg py-3 px-6 text-lg shadow-md">
          Game Over!
        </div>
      )}

      {showTurnIndicator && (
        <div className="mb-4 font-semibold text-lg" style={{ color: isRedTurn ? "red" : "#222" }}>
          {turnLabel}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">Connect Four</h1>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/connectFour")}
            className="text-sm text-blue-500 underline cursor-pointer"
          >
            ← Menu
          </button>
          <button
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg py-2 px-4 transition-all duration-200 shadow-md hover:shadow-lg text-sm cursor-pointer"
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>

        <div className="flex justify-center sm:space-x-2">
          {columns.map((column: Column, index: number) => (
            <ConnectFourColumn
              key={index}
              column={column}
              handleClick={(col: Column) => handleClickColumn(index, col)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectFourBoard;
