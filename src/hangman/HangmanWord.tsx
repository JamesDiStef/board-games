interface Props {
  wordToGuess: string;
  guessedLetters: string[];
}

const HangmanWord = ({ wordToGuess, guessedLetters }: Props) => {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {wordToGuess.split("").map((letter, index) => (
        <div
          key={index}
          className="inline-flex flex-col items-center w-8 h-auto"
          style={{ minWidth: "2rem" }}
        >
          <span
            className="text-lg sm:text-2xl md:text-3xl font-bold font-monospace"
            style={{
              visibility: guessedLetters.includes(letter)
                ? "visible"
                : "hidden",
              height: "1.5em",
              display: "flex",
              alignItems: "center",
            }}
          >
            {letter}
          </span>
          <div
            className="w-full border-b-2 border-black"
            style={{
              marginTop: "0.25rem",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default HangmanWord;
