const HEAD = (
  <div
    style={{
      height: "80px",
      width: "80px",
      border: "10px solid black",
      borderRadius: "100%",
      position: "absolute",
      top: "50px",
      right: "-45px",
    }}
  ></div>
);

const BODY = (
  <div
    style={{
      height: "100px",
      width: "10px",
      background: "black",
      position: "absolute",
      top: "150px",
      right: "0",
    }}
  ></div>
);

const LEFT_ARM = (
  <div
    style={{
      height: "10px",
      width: "100px",
      background: "black",
      position: "absolute",
      top: "180px",
      right: "10px",
      rotate: "30deg",
      transformOrigin: "right bottom",
    }}
  ></div>
);

const RIGHT_ARM = (
  <div
    style={{
      height: "10px",
      width: "100px",
      background: "black",
      position: "absolute",
      top: "180px",
      right: "-100px",
      rotate: "-30deg",
      transformOrigin: "left bottom",
    }}
  ></div>
);

const RIGHT_LEG = (
  <div
    style={{
      height: "10px",
      width: "100px",
      background: "black",
      position: "absolute",
      top: "290px",
      right: "-80px",
      rotate: "30deg",
      transformOrigin: "right bottom",
    }}
  ></div>
);

const LEFT_LEG = (
  <div
    style={{
      height: "10px",
      width: "100px",
      background: "black",
      position: "absolute",
      top: "290px",
      right: "-10px",
      rotate: "-30deg",
      transformOrigin: "left bottom",
    }}
  ></div>
);

interface Props {
  wrongGuesses: number;
}

const HangmanCrawing = ({ wrongGuesses }: Props) => {
  return (
    <div style={{ position: "relative" }}>
      {wrongGuesses > 0 && HEAD}
      {wrongGuesses > 1 && BODY}
      {wrongGuesses > 2 && RIGHT_ARM}
      {wrongGuesses > 3 && LEFT_ARM}
      {wrongGuesses > 4 && RIGHT_LEG}
      {wrongGuesses > 5 && LEFT_LEG}
      <div
        style={{
          height: "50px",
          width: "10px",
          background: "black",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      ></div>
      <div
        style={{
          marginLeft: "120px",
          height: "10px",
          width: "340px",
          background: "black",
        }}
      ></div>
      <div
        style={{
          marginLeft: "120px",
          height: "400px",
          width: "10px",
          background: "black",
        }}
      ></div>
      <div
        style={{ height: "10px", width: "300px", background: "black" }}
      ></div>
    </div>
  );
};

export default HangmanCrawing;
