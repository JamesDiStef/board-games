const HangmanWord = ({ wordToGuess, guessedLetters }) => {
  return (
    <div
      style={{
        display: "flex",
        fontSize: "6rem",
        fontWeight: "bold",
        fontFamily: "monospace",
        gap: ".25em",
        marginBottom: "20px",
      }}
    >
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
