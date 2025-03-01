import { useState } from "react";
import words from "./words.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

function HangmanBoard() {
  const [isWin, setIsWin] = useState(false);
  const [wordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const [wrongGuesses, setWrongGuesses] = useState(0);

  const handleGuess = (letter: string) => {
    setGuessedLetters([...guessedLetters, letter]);
    if (!wordToGuess.includes(letter)) setWrongGuesses(wrongGuesses + 1);
    for (let i = 0; i < wordToGuess.length; i++) {
      if (!guessedLetters.includes(wordToGuess.charAt(i))) break;
      if (i === wordToGuess.length - 1) setIsWin(true);
    }
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
      {wrongGuesses === 6 && (
        <div
          style={{
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          You lose :(
        </div>
      )}
      {isWin && (
        <div
          style={{
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          You win!
        </div>
      )}
      <HangmanDrawing wrongGuesses={wrongGuesses} />
      <HangmanWord wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          handleGuess={handleGuess}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
      </div>
    </div>
  );
}

export default HangmanBoard;
