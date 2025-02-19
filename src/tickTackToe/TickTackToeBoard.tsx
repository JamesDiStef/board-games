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

  const checkGameOver = (squareNumber: number) => {
    setNumClicks(numClicks + 1);
    if (numClicks < 4) return;
    console.log("ok");

    switch (squareNumber) {
      case 0:
        if (board[0] === board[1] && board[1] === board[2]) setGameOver(true);
        else if (board[0] === board[3] && board[3] === board[6])
          setGameOver(true);
        else if (board[0] === board[4] && board[4] == board[8])
          setGameOver(true);
        break;
    }
  };

  const handleClick = (squareNumber: number) => {
    const nextValue = isPlayerOne ? "X" : "O";
    setBoard(
      board.map((s) =>
        s.num === squareNumber ? { ...s, value: nextValue } : s
      )
    );
    setIsPlayerOne(!isPlayerOne);
    checkGameOver(squareNumber);
  };

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
