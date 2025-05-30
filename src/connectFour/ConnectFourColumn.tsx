import { Column, Square } from "./ConnectFourBoard";

interface Props {
  column: Column;
  handleClick: (col: Column) => void;
}

const ConnectFourColumn = ({ column, handleClick }: Props) => {
  return (
    <div
      onClick={() => handleClick(column)}
      className="flex flex-col items-center mt-[90px] md:mt-[50px] lg:mt-[30px] h-[300px] sm:h-[500px] lg:h-[700px] w-[120px] border-2 border-black"
    >
      {column.squares.map((s: Square) => (
        <div
          key={s.id}
          className="flex flex-col h-[110px] w-[50px] sm:w-[70px] md:w-[90px] lg:w-[110px] rounded-full border-2 border-black"
          style={{
            backgroundColor: `${s.color}`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default ConnectFourColumn;
