import { Column, Square } from "./ConnectFourBoard";

interface Props {
  column: Column;
  handleClick: (col: Column) => void;
}

const ConnectFourColumn = ({ column, handleClick }: Props) => {
  return (
    <button
      onClick={() => handleClick(column)}
      className="flex flex-col items-center justify-around h-full w-16 md:w-20 bg-blue-700 border-4 border-blue-900 rounded-lg hover:bg-blue-800 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl p-2 gap-1.5"
    >
      {column.squares.map((s: Square) => (
        <div
          key={s.id}
          className={`
            w-12 md:w-16 h-12 md:h-16 rounded-full border-3 border-blue-900
            transition-all duration-200 flex-shrink-0
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
