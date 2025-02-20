interface Props {
  column: any;
  handleClick: any;
}

const ConnectFourRow = ({ column, handleClick }: Props) => {
  return (
    <div
      onClick={() => handleClick(column)}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "700px",
        width: "120px",
        border: "2px solid black",
      }}
    >
      {column.squares.map((s: any) => (
        <div
          key={s.id}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "110px",
            width: "110px",
            borderRadius: "100%",
            border: "2px solid black",
            textAlign: "center",
            backgroundColor: `${s.color}`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default ConnectFourRow;
