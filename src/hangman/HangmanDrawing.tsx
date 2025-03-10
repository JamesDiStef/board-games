const HEAD = (
  <div className="h-[40px] lg:h-[80px] w-[40px] lg:w-[80px] border-[10px] border-black rounded-full absolute top-[20px] lg:top-[50px] right-[-15px] lg:right-[-45px]"></div>
);

const BODY = (
  <div className="h-[50px] lg:h-[100px] w-[10px] bg-black absolute top-[50px] lg:top-[150px] right-0"></div>
);

const LEFT_ARM = (
  <div className="h-[10px] w-[50px] lg:w-[100px] bg-black absolute top-[70px] lg:top-[180px] right-[10px] rotate-[30deg] origin-bottom-right"></div>
);

const RIGHT_ARM = (
  <div className="h-[10px] w-[50px] lg:w-[100px] bg-black absolute top-[70px] lg:top-[180px] right-[-50px] lg:right-[-100px] rotate-[-30deg] origin-bottom-left"></div>
);

const RIGHT_LEG = (
  <div className="h-[10px] w-[50px] lg:w-[100px] bg-black absolute top-[120px] lg:top-[290px] right-[-30px] lg:right-[-80px] rotate-[30deg] origin-bottom-right"></div>
);

const LEFT_LEG = (
  <div className="h-[10px] w-[50px] lg:w-[100px] bg-black absolute top-[120px] lg:top-[290px] right-[-10px] rotate-[-30deg] origin-bottom-left"></div>
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
      <div className="h-[30px] lg:h-[50px] w-[10px] bg-black absolute top-0 right-0"></div>
      <div className="h-[10px] ml-[120px] w-[100px] lg:w-[340px] bg-black"></div>
      <div className="ml-[120px] h-[150px] lg:h-[300px] w-[10px] bg-black"></div>
      <div className="ml-[80px] lg:ml-0 h-[10px] w-[80px] lg:w-[300px] bg-black"></div>
    </div>
  );
};

export default HangmanCrawing;
