interface Props {
  handleGuess: (arg: string) => void;
  guessedLetters: string[];
  wordToGuess: string;
}

const alphabet: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Keyboard = ({ guessedLetters, handleGuess, wordToGuess }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: "1rem",
      }}
    >
      {alphabet.map((letter) => (
        <button
          key={letter}
          style={{
            backgroundColor:
              guessedLetters.includes(letter) && !wordToGuess.includes(letter)
                ? "blue"
                : "white",
          }}
          onClick={() => handleGuess(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
