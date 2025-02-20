import { useState } from "react";

const ConnectFourRow = () => {
  const [column, setColumn] = useState([
    { id: 0, color: "" },
    { id: 1, color: "" },
    { id: 2, color: "" },
    { id: 3, color: "" },
    { id: 4, color: "" },
    { id: 5, color: "" },
  ]);

  const handleClick = () => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "700px",
        width: "120px",
        border: "2px solid black",
      }}
    >
      {column.map((s) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "110px",
            width: "110px",
            borderRadius: "100%",
            border: "2px solid black",
            textAlign: "center",
          }}
        >
          Square
        </div>
      ))}
    </div>
  );
};

export default ConnectFourRow;
