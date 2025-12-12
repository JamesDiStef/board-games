interface Props {
  num: number;
  value: string;
  handleClick: (num: number) => void;
}

const Square = ({ num, value, handleClick }: Props) => {
  return (
    <button
      onClick={() => handleClick(num)}
      disabled={value !== ""}
      className={`
        h-24 w-24 sm:h-32 sm:w-32 font-bold text-4xl sm:text-5xl rounded-lg
        transition-all duration-200 shadow-md
        ${value === "" 
          ? 'bg-white border-3 border-blue-500 hover:bg-blue-50 active:bg-blue-100 cursor-pointer hover:shadow-lg' 
          : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white border-3 border-blue-700 cursor-not-allowed'
        }
      `}
    >
      {value}
    </button>
  );
};

export default Square;
