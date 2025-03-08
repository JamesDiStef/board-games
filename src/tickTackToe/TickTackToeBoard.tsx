import { useEffect, useState } from "react";
import Square from "../tickTackToe/Square";
import confetti from "canvas-confetti";

const Board = () => {
  const [numClicks, setNumClicks] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlayerOne, setIsPlayerOne] = useState(true);
  const [board, setBoard] = useState([
    { num: 0, value: "" },
    { num: 1, value: "" },
    { num: 2, value: "" },
    { num: 3, value: "" },
    { num: 4, value: "" },
    { num: 5, value: "" },
    { num: 6, value: "" },
    { num: 7, value: "" },
    { num: 8, value: "" },
  ]);

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

  const checkGameOver = () => {
    setNumClicks(numClicks + 1);
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
    setBoard([
      { num: 0, value: "" },
      { num: 1, value: "" },
      { num: 2, value: "" },
      { num: 3, value: "" },
      { num: 4, value: "" },
      { num: 5, value: "" },
      { num: 6, value: "" },
      { num: 7, value: "" },
      { num: 8, value: "" },
    ]);
    setNumClicks(0);
    setGameOver(false);
  };

  const handleClick = (squareNumber: number) => {
    if (gameOver) return;
    const nextValue = isPlayerOne ? "X" : "O";
    setBoard(
      board.map((s) =>
        s.num === squareNumber ? { ...s, value: nextValue } : s
      )
    );
    setIsPlayerOne(!isPlayerOne);
    checkGameOver();
  };

  useEffect(() => {
    if (checkGameOver()) setGameOver(true);
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
        {board.map((s: any) => (
          <Square
            key={s.num}
            num={s.num}
            value={s.value}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
