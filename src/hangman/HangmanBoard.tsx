import { useEffect } from "react";
import words from "./words.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import confetti from "canvas-confetti";
import { useDispatch, useSelector } from "react-redux";
import {
  setGame,
  setGuessedLetters,
  setIsWin,
  setWrongGuesses,
  resetGameState,
} from "./hangmanSlice";
import { updateHangmanGame } from "./hangmanThunks";
import { AppDispatch } from "../store";

function HangmanBoard() {
  const userId = useSelector((state: any) => state.user.userId);
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  const isWin = useSelector((state: any) => state.hangman.isWin);
  const wordToGuess = useSelector((state: any) => state.hangman.wordToGuess);
  const guessedLetters = useSelector(
    (state: any) => state.hangman.guessedLetters
  );

  const wrongGuesses = useSelector((state: any) => state.hangman.wrongGuesses);

  const handleGuess = (letter: string) => {
    dispatch(setGuessedLetters([...guessedLetters, letter]));
    if (!wordToGuess.includes(letter))
      dispatch(setWrongGuesses(wrongGuesses + 1));
    if (isAuthenticated) {
      dispatch(updateHangmanGame({ userId, stuffToPatch: { guessedLetters: [...guessedLetters, letter] } }));
    }
  };

  const handleRestart = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    const newGame = {
      wordToGuess: newWord,
      guessedLetters: [],
      isWin: false,
      wrongGuesses: 0,
    };
    dispatch(setGame(newGame));
    if (isAuthenticated) {
      dispatch(updateHangmanGame({ userId, stuffToPatch: newGame }));
    }
  };

  useEffect(() => {
    dispatch(resetGameState());
    const newWord = words[Math.floor(Math.random() * words.length)];
    dispatch(setGame({ wordToGuess: newWord, guessedLetters: [], isWin: false, wrongGuesses: 0 }));
  }, [userId, isAuthenticated, dispatch]);

  useEffect(() => {
    for (let i = 0; i < wordToGuess.length; i++) {
      if (!guessedLetters.includes(wordToGuess.charAt(i))) break;
      if (i === wordToGuess.length - 1) {
        dispatch(setIsWin(true));
        confetti({
          particleCount: 150,
          spread: 60,
        });
      }
    }
  });

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
      <button
        className="border-2 bg-amber-400 rounded-2xl mb-[20px] p-3"
        onClick={handleRestart}
      >
        Restart
      </button>
      {wrongGuesses === 6 && !isWin && (
        <div
          style={{
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          You lose :(
        </div>
      )}
      {isWin && wrongGuesses !== 6 && (
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
