import { useEffect, useState } from "react";
import Square from "./Square";

const Board = () => {
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

  const handleClick = (squareNumber: number) => {
    const nextValue = isPlayerOne ? "X" : "O";
    setBoard(
      board.map((s) =>
        s.num === squareNumber ? { ...s, value: nextValue } : s
      )
    );
    setIsPlayerOne(!isPlayerOne);
  };

  useEffect(() => {
    setGameOver(false);
    if (board[0].value === board[1].value && board[1].value === board[2].value)
      setGameOver(true);
    else if (
      board[3].value === board[4].value &&
      board[4].value === board[5].value
    )
      setGameOver(true);
    else if (
      board[6].value === board[7].value &&
      board[7].value === board[8].value
    )
      setGameOver(true);
    else if (
      board[0].value === board[3].value &&
      board[3].value === board[6].value
    )
      setGameOver(true);
    else if (
      board[0].value === board[1].value &&
      board[1].value === board[2].value
    )
      setGameOver(true);
    else if (
      board[0].value === board[1].value &&
      board[1].value === board[2].value
    )
      setGameOver(true);
    else if (
      board[0].value === board[1].value &&
      board[1].value === board[2].value
    )
      setGameOver(true);
    else if (
      board[0].value === board[1].value &&
      board[1].value === board[2].value
    )
      setGameOver(true);
  }, [board]);

  return (
    <div
      style={{
        marginTop: "20%",
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
