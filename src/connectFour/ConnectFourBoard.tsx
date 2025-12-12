import { useEffect } from "react";
import ConnectFourColumn from "./ConnectFourColumn";
import confetti from "canvas-confetti";
import { useDispatch, useSelector } from "react-redux";
import { handleDropPiece, restart, toggleGameOver } from "./connectFourSlice";

export interface Column {
  counter: number;
  squares: Square[];
}

export interface Square {
  id: number;
  color: string;
}

const ConnectFourBoard = () => {
  const api = import.meta.env.VITE_NEW_API_URL;
  const userId = useSelector((state: any) => state.user.userId);
  const isRedTurn = useSelector((state: any) => state.connectFour.isRedTurn);
  const isGameOver = useSelector((state: any) => state.connectFour.isGameOver);
  const columns = useSelector((state: any) => state.connectFour.columns);

  const dispatch = useDispatch();

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
    saveGame({ columns: updatedColumns });
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
    saveGame({
      columns: Array(7).fill({
        counter: 5,
        squares: [
          { id: 0, color: "" },
          { id: 1, color: "" },
          { id: 2, color: "" },
          { id: 3, color: "" },
          { id: 4, color: "" },
          { id: 5, color: "" },
        ],
      }),
    });
    dispatch(restart());
  };

  const fetchGame = async () => {
    if (userId === "") return;

    const response = await fetch(`${api}/connectFour/${userId}`);
    const game = await response.json();
    if (game.length === 0) createGame();
    dispatch(handleDropPiece(game[0].columns));
  };

  const createGame = async () => {
    if (userId === "") return;

    await fetch(`${api}/connectFour/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const saveGame = async (stuffToPatch: any) => {
    if (userId === "") return;
    await fetch(`${api}/connectFour/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stuffToPatch),
    });
  };

  useEffect(() => {
    if (userId !== "") fetchGame();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center bg-gradient-to-br from-yellow-50 to-red-100 overflow-hidden">
      <div className="w-full flex flex-col h-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-red-600 flex-shrink-0">Connect Four</h1>
        
        <button
          onClick={handleRestart}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg px-4 py-2 w-full transition-all duration-200 shadow-md hover:shadow-lg mb-2 flex-shrink-0 text-sm"
        >
          New Game
        </button>

        {isGameOver && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-center rounded-lg p-2 mb-2 text-sm shadow-lg flex-shrink-0">
            🎉 Game Over! 🎉
          </div>
        )}

        <div className="flex-1 w-full flex justify-center">
          <div className="flex bg-blue-600 h-full w-full lg:w-[calc(100%-12rem)] lg:mx-24">
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
    </div>
  );
};

export default ConnectFourBoard;
