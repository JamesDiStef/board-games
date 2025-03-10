import { useState } from "react";
import ConnectFourColumn from "./ConnectFourColumn";
import confetti from "canvas-confetti";

export interface Column {
  counter: number;
  squares: Square[];
}

export interface Square {
  id: number;
  color: string;
}

const ConnectFourBoard = () => {
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const initialColumns = Array(7).fill({
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

  const [columns, setColumns] = useState(initialColumns);

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
    setColumns(updatedColumns);
    setIsRedTurn(!isRedTurn);
    checkVerticalWin(updatedColumns);
    checkHorizontalWin(updatedColumns);
    checkDiagonalWin(updatedColumns);
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
          setIsGameOver(true);
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
          setIsGameOver(true);
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
          setIsGameOver(true);
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
          setIsGameOver(true);
          confetti({
            particleCount: 150,
            spread: 60,
          });
        }
      }
    }
  };

  const handleRestart = () => {
    setColumns(initialColumns);
    setIsGameOver(false);
  };

  return (
    <div className="">
      <button
        className="border-2 bg-amber-400 rounded-2xl mt-[30px] p-3 ml-[45%]"
        onClick={handleRestart}
      >
        Restart
      </button>
      {isGameOver && <div className="flex justify-center">Game over!!!</div>}

      <div className="flex justify-center sm:space-x-2">
        {columns.map((column, index) => (
          <ConnectFourColumn
            key={index}
            column={column}
            handleClick={(col: Column) => handleClickColumn(index, col)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConnectFourBoard;
