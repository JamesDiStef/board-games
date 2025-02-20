import { useState } from "react";

const ConnectFourBoard = () => {
  const [board, setBoard] = useState([
    { id: 0, color: "" },
    { id: 1, color: "" },
    { id: 2, color: "" },
    { id: 3, color: "" },
    { id: 4, color: "" },
    { id: 5, color: "" },
    { id: 6, color: "" },
    { id: 7, color: "" },
    { id: 8, color: "" },
    { id: 9, color: "" },
    { id: 10, color: "" },
    { id: 11, color: "" },
    { id: 12, color: "" },
    { id: 13, color: "" },
    { id: 14, color: "" },
    { id: 15, color: "" },
    { id: 16, color: "" },
    { id: 17, color: "" },
    { id: 18, color: "" },
    { id: 19, color: "" },
    { id: 20, color: "" },
    { id: 21, color: "" },
    { id: 22, color: "" },
    { id: 23, color: "" },
    { id: 24, color: "" },
    { id: 25, color: "" },
    { id: 26, color: "" },
    { id: 27, color: "" },
    { id: 28, color: "" },
    { id: 29, color: "" },
    { id: 30, color: "" },
    { id: 31, color: "" },
    { id: 32, color: "" },
    { id: 33, color: "" },
    { id: 34, color: "" },
    { id: 35, color: "" },
    { id: 36, color: "" },
    { id: 37, color: "" },
    { id: 38, color: "" },
    { id: 38, color: "" },
    { id: 40, color: "" },
    { id: 41, color: "" },
  ]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 120px)",
        marginLeft: "200px",
      }}
    >
      {board.map((s) => (
        <div
          style={{ height: "120px", width: "120px", border: "2px solid black" }}
        >
          <div
            style={{
              height: "110px",
              width: "110px",
              borderRadius: "100%",
              border: "2px solid black",
              textAlign: "center",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ConnectFourBoard;
