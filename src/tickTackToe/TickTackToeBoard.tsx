import { useEffect } from "react";
import Square from "../tickTackToe/Square";
import confetti from "canvas-confetti";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsGameOver,
  setIsPlayerOne,
  setNumClick,
  setBoardUpdate,
  setUpGame,
} from "./ticTacSlice";

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
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        className="border-2 bg-amber-400 rounded-2xl mb-[20px] p-3"
        onClick={handleRestart}
      >
        Restart
      </button>
      {gameOver && <p>Game over!!!!</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          rowGap: "10px",
          columnGap: "10px",
        }}
      >
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
  );
};

export default Board;
