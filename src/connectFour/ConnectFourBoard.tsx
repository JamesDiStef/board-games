import { useState } from "react";
import ConnectFourRow from "./ConnectFourRow";

const ConnectFourBoard = () => {
  const [isRedTurn, setIsRedTurn] = useState(true);

  const [column1, setColumn1] = useState({
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

  const [column2, setColumn2] = useState({
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

  const [column3, setColumn3] = useState({
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

  const [column4, setColumn4] = useState({
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

  const [column5, setColumn5] = useState({
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

  const [column6, setColumn6] = useState({
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
  const [column7, setColumn7] = useState({
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

  const handleClickColumn1 = (column: any) => {
    setColumn1({
      counter: column1.counter - 1,
      squares: column1.squares.map((s: any) =>
        s.id === column.counter
          ? { ...s, color: isRedTurn ? "red" : "black" }
          : s
      ),
    });
    setIsRedTurn(!isRedTurn);
  };

  const handleClickColumn2 = (column: any) => {
    setColumn2({
      counter: column2.counter - 1,
      squares: column2.squares.map((s: any) =>
        s.id === column.counter
          ? { ...s, color: isRedTurn ? "red" : "black" }
          : s
      ),
    });
    setIsRedTurn(!isRedTurn);
  };

  const handleClickColumn3 = (column: any) => {
    setColumn3({
      counter: column3.counter - 1,
      squares: column3.squares.map((s: any) =>
        s.id === column.counter
          ? { ...s, color: isRedTurn ? "red" : "black" }
          : s
      ),
    });
    setIsRedTurn(!isRedTurn);
  };

  const handleClickColumn4 = (column: any) => {
    setColumn4({
      counter: column4.counter - 1,
      squares: column4.squares.map((s: any) =>
        s.id === column.counter
          ? { ...s, color: isRedTurn ? "red" : "black" }
          : s
      ),
    });
    setIsRedTurn(!isRedTurn);
  };

  const handleClickColumn5 = (column: any) => {
    setColumn5({
      counter: column5.counter - 1,
      squares: column5.squares.map((s: any) =>
        s.id === column.counter
          ? { ...s, color: isRedTurn ? "red" : "black" }
          : s
      ),
    });
    setIsRedTurn(!isRedTurn);
  };

  const handleClickColumn6 = (column: any) => {
    setColumn6({
      counter: column6.counter - 1,
      squares: column6.squares.map((s: any) =>
        s.id === column.counter
          ? { ...s, color: isRedTurn ? "red" : "black" }
          : s
      ),
    });
    setIsRedTurn(!isRedTurn);
  };

  const handleClickColumn7 = (column: any) => {
    setColumn7({
      counter: column7.counter - 1,
      squares: column7.squares.map((s: any) =>
        s.id === column.counter
          ? { ...s, color: isRedTurn ? "red" : "black" }
          : s
      ),
    });
    setIsRedTurn(!isRedTurn);
  };

  return (
    <div className="flex justify-center sm:space-x-2">
      <ConnectFourRow column={column1} handleClick={handleClickColumn1} />
      <ConnectFourRow column={column2} handleClick={handleClickColumn2} />
      <ConnectFourRow column={column3} handleClick={handleClickColumn3} />
      <ConnectFourRow column={column4} handleClick={handleClickColumn4} />
      <ConnectFourRow column={column5} handleClick={handleClickColumn5} />
      <ConnectFourRow column={column6} handleClick={handleClickColumn6} />
      <ConnectFourRow column={column7} handleClick={handleClickColumn7} />
    </div>
  );
};

export default ConnectFourBoard;
