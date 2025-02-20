interface Props {
  num: number;
  value: string;
  handleClick: any;
}

const Square = ({ num, value, handleClick }: Props) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        onClick={() => handleClick(num)}
        style={{
          height: "100px",
          width: "200px",
          border: "2px solid black",
          borderRadius: "2px",
          fontSize: "36px",
        }}
      >
        {value}
      </button>
    </div>
  );
};

export default Square;
