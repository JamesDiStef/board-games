import { useState } from "react";
import ConnectFourRow from "./ConnectFourRow";

const ConnectFourBoard = () => {
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "200px",
      }}
    >
      <ConnectFourRow />
      <ConnectFourRow />
      <ConnectFourRow />
      <ConnectFourRow />
      <ConnectFourRow />
      <ConnectFourRow />
    </div>
  );
};

export default ConnectFourBoard;
