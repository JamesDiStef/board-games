import { useState } from "react";
import words from "./words.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

function HangmanBoard() {
  const [wordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const [wrongGuesses, setWrongGuesses] = useState(0);

  const handleGuess = (letter: string) => {
    setGuessedLetters([...guessedLetters, letter]);
    if (!wordToGuess.includes(letter)) setWrongGuesses(wrongGuesses + 1);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        Lose Win
      </div>
      <HangmanDrawing wrongGuesses={wrongGuesses} />
      <HangmanWord wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard handleGuess={handleGuess} />
      </div>
    </div>
  );
}

export default HangmanBoard;
