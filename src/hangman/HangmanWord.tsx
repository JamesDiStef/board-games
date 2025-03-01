interface Props {
  wordToGuess: string;
  guessedLetters: string[];
}

const HangmanWord = ({ wordToGuess, guessedLetters }: Props) => {
  return (
    <div className="flex text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold font-monospace gap-[0.25em] mb-[10px] lg:mb-[20px]">
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1rem solid black" }} key={index}>
          <span
            style={{
              visibility: guessedLetters.includes(letter)
                ? "visible"
                : "hidden",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
