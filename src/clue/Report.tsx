interface Props {
  isGameOver: boolean;
}

const Report = ({ isGameOver }: Props) => {
  return (
    <div className="flex flex-col fixed h-[80%] w-[80%] bg-amber-700">
      {isGameOver && <div>Game Over!! You win!!!</div>}
      {!isGameOver && <div>So here's the deal</div>}
    </div>
  );
};

export default Report;
