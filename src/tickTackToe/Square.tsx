interface Props {
  num: number;
  value: string;
  handleClick: (num: number) => void;
}

const Square = ({ num, value, handleClick }: Props) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    <button
      onClick={() => handleClick(num)}
      disabled={value !== ""}
      className={`
        w-20 h-20 md:w-24 md:h-24 font-bold text-2xl md:text-3xl rounded-lg
        transition-all duration-200 shadow-md flex items-center justify-center
        ${value === ""
          ? 'bg-white border-3 border-gray-300 hover:bg-gray-50 active:bg-gray-100 cursor-pointer hover:shadow-lg'
          : value === "X"
            ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white border-3 border-blue-700 cursor-not-allowed'
            : 'bg-gradient-to-br from-red-400 to-red-600 text-white border-3 border-red-700 cursor-not-allowed'
        }
      `}
    >
      {value}
    </button>
    </div>
  );
};
export default Square;
