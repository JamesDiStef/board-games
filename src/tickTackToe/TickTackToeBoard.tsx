import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsGameOver,
  setIsPlayerOne,
  setNumClick,
  setBoardUpdate,
  setUpGame,
} from "./ticTacSlice";
import Square from "./Square";
interface Square {
  num: number;
  value: string;
}

const Board = () => {
  const api = import.meta.env.VITE_NEW_API_URL;
  const userId = useSelector((state: any) => state.user.userId);
  const numClicks = useSelector((state: any) => state.ticTacToe.numClicks);
  const gameOver = useSelector((state: any) => state.ticTacToe.isGameOver);
  const isPlayerOne = useSelector((state: any) => state.ticTacToe.isPlayerOne);
  const board = useSelector((state: any) => state.ticTacToe.board);

  const dispatch = useDispatch();

  const gameOverCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const blankBoard = [
    { num: 0, value: "" },
    { num: 1, value: "" },
    { num: 2, value: "" },
    { num: 3, value: "" },
    { num: 4, value: "" },
    { num: 5, value: "" },
    { num: 6, value: "" },
    { num: 7, value: "" },
    { num: 8, value: "" },
  ];

  const checkGameOver = () => {
    dispatch(setNumClick(numClicks + 1));
    if (numClicks < 4) return;

    for (let i = 0; i < gameOverCombos.length; i++) {
      const [a, b, c] = gameOverCombos[i];
      if (
        board[a].value === board[b].value &&
        board[b].value === board[c].value &&
        board[a].value !== ""
      ) {
        confetti({
          particleCount: 150,
          spread: 60,
        });
        return true;
      }
    }
    return false;
  };

  const handleRestart = () => {
    const newGame = {
      board: blankBoard,
      isPlayerOne: true,
      isGameOver: false,
      numClicks: 0,
    };
    dispatch(setUpGame(newGame));
    updateGame({ board: newGame.board });
  };

  const handleClick = (squareNumber: number) => {
    console.log("click", squareNumber);
    if (gameOver) return;
    const nextValue = isPlayerOne ? "X" : "O";
    const nextBoard = board.map((s: Square) =>
      s.num === squareNumber ? { ...s, value: nextValue } : s
    );
    console.log(nextBoard);
    dispatch(setBoardUpdate(nextBoard));
    dispatch(setIsPlayerOne());
    updateGame({ board: nextBoard });
    checkGameOver();
  };

  const updateGame = async (stuffToPatch: any) => {
    if (userId === "") return;

    console.log(`${api}/ticTacToe/${userId}`);
    const response = await fetch(`${api}/ticTacToe/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stuffToPatch),
    });
    const game = response.json();
    console.log(game);
  };

  const fetchCurrentGame = async () => {
    if (userId === "") return;

    const response = await fetch(`${api}/ticTacToe/${userId}`);
    const game = await response.json();
    if (game.length === 0) {
      createNewGame();
    } else {
      dispatch(
        setUpGame({
          board: [
            { num: 0, value: game[0].board[0].value },
            { num: 1, value: game[0].board[1].value },
            { num: 2, value: game[0].board[2].value },
            { num: 3, value: game[0].board[3].value },
            { num: 4, value: game[0].board[4].value },
            { num: 5, value: game[0].board[5].value },
            { num: 6, value: game[0].board[6].value },
            { num: 7, value: game[0].board[7].value },
            { num: 8, value: game[0].board[8].value },
          ],
          isPlayerOne: game[0].isPlayerOne,
          isGameOver: game[0].isGameOver,
          numClicks: game[0].numClicks,
        })
      );
    }
  };

  const createNewGame = async () => {
    if (userId === "") return;

    const response = await fetch(`${api}/ticTacToe/${userId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
  };

  useEffect(() => {
    if (userId !== "") fetchCurrentGame();
  }, []);

  useEffect(() => {
    if (checkGameOver()) dispatch(setIsGameOver(true));
  }, [board]);

  return (
  <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">

    {/* GAME OVER BANNER ABOVE EVERYTHING */}
    {gameOver && (
      <div className="mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-center rounded-lg py-3 px-6 text-lg shadow-md">
        🎉 Game Over! 🎉
      </div>
    )}

    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full flex flex-col overflow-hidden">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600 flex-shrink-0">
        Tic Tac Toe
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleRestart}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg py-2 px-4 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
        >
          Restart Game
        </button>
      </div>

      <div className="flex items-center justify-center flex-1">
        <div className="grid grid-cols-3 gap-3">
          {board.map((s: Square) => (
            <Square
              key={s.num}
              num={s.num}
              value={s.value}
              handleClick={() => handleClick(s.num)}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default Board;
