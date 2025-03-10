import { useState } from "react";
import ConnectFourColumn from "./ConnectFourColumn";

interface Column {
  counter: number;
  squares: Square[];
}

interface Square {
  id: number;
  color: string;
}

const ConnectFourBoard = () => {
  const [isRedTurn, setIsRedTurn] = useState(true);

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
  };

  const handleRestart = () => {
    setColumns(initialColumns);
  };

  return (
    <div className="">
      <button
        className="border-2 bg-amber-400 rounded-2xl mt-[30px] p-3 ml-[45%]"
        onClick={handleRestart}
      >
        Restart
      </button>

      <div className="flex justify-center sm:space-x-2">
        {columns.map((column, index) => (
          <ConnectFourColumn
            key={index}
            column={column}
            handleClick={(col: any) => handleClickColumn(index, col)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConnectFourBoard;
