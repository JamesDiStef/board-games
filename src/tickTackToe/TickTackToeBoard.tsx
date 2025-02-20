import { useEffect, useState } from "react";
import Square from "../tickTackToe/Square";

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
    console.log("ok");

    for (let i = 0; i < gameOverCombos.length; i++) {
      const [a, b, c] = gameOverCombos[i];
      if (
        board[a].value === board[b].value &&
        board[b].value === board[c].value &&
        board[a].value !== ""
      ) {
        console.log("ayyyyyy");
        console.log(a, b, c);
        return true;
      }
    }
    return false;
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
