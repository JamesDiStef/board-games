import { Column, Square } from "./ConnectFourBoard";

interface Props {
  column: Column;
  handleClick: (col: Column) => void;
}

const ConnectFourColumn = ({ column, handleClick }: Props) => {
  return (
    <button
      onClick={() => handleClick(column)}
      className="flex flex-col items-center mt-[90px] md:mt-[50px] lg:mt-[30px] h-[300px] sm:h-[500px] lg:h-[700px] w-[120px] bg-blue-700 border-4 border-blue-900 rounded-lg hover:bg-blue-800 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
    >
      {column.squares.map((s: Square) => (
        <div
          key={s.id}
          className={`
            flex flex-col h-[110px] w-[50px] sm:w-[70px] md:w-[90px] lg:w-[110px] rounded-full border-3 border-blue-900
            transition-all duration-200
            ${s.color === 'red' ? 'bg-red-500 shadow-lg' : 
              s.color === 'black' ? 'bg-gray-800 shadow-lg' : 
              'bg-yellow-300 shadow-md'}
          `}
        ></div>
      ))}
    </button>
  );
};

export default ConnectFourColumn;
