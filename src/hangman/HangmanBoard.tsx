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
} from "./hangmanSlice";

function HangmanBoard() {
  const api = import.meta.env.VITE_NEW_API_URL;
  const userId = useSelector((state: any) => state.user.userId);
  const dispatch = useDispatch();

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
    updateGame({ guessedLetters: [...guessedLetters, letter] });
    updateGame({ wordToGuess: wordToGuess });
    updateGame({ isWin: isWin });
    updateGame({ wrongGuesses: wrongGuesses + 1 });
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
    updateGame({ guessedLetters: [] });
    updateGame({ wordToGuess: wordToGuess });
    updateGame({ isWin: false });
    updateGame({ wrongGuesses: 0 });
  };

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

  const updateGame = async (stuffToPatch: any) => {
    await fetch(`${api}/hangman/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stuffToPatch),
    });
  };

  const fetchCurrentGame = async () => {
    const response = await fetch(`${api}/hangman/${userId}`);
    const game = await response.json();
    if (game.length === 0) {
      createNewGame();
    } else {
      const theGame = {
        guessedLetters: game[0].guessedLetters,
        isWin: game[0].isWin,
        wrongGuesses: game[0].wrongGuesses,
        wordToGuess: game[0].wordToGuess,
      };
      dispatch(setGame(theGame));
    }
  };

  const createNewGame = async () => {
    const response = await fetch(`${api}/hangman/${userId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
  };

  useEffect(() => {
    fetchCurrentGame();
  }, []);

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
