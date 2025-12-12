import { Column, Square } from "./ConnectFourBoard";

interface Props {
  column: Column;
  handleClick: (col: Column) => void;
}

const ConnectFourColumn = ({ column, handleClick }: Props) => {
  return (
    <button
      onClick={() => handleClick(column)}
      className="flex flex-col items-center justify-between h-full flex-1 bg-blue-700 border-2 border-blue-900 hover:bg-blue-800 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl p-0.5 sm:p-1 md:p-1.5 lg:p-2"
    >
      {column.squares.map((s: Square) => (
        <div
          key={s.id}
          className={`
            flex-1 aspect-square border-2 border-blue-900 min-w-0 max-w-full
            transition-all duration-200
            ${s.color === 'red' ? 'bg-red-500 shadow-lg' : 
              s.color === 'black' ? 'bg-gray-800 shadow-lg' : 
              'bg-yellow-300 shadow-md'}
          `}
          style={{ borderRadius: '50%' }}
        ></div>
      ))}
    </button>
  );
};

export default ConnectFourColumn;
