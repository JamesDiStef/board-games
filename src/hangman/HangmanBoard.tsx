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
    if (userId === "") handleRestart();
  }, []);

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
    if (userId === "") return;

    await fetch(`${api}/hangman/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stuffToPatch),
    });
  };

  const fetchCurrentGame = async () => {
    if (userId === "") return;

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
    if (userId === "") return;

    const response = await fetch(`${api}/hangman/${userId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
  };

  useEffect(() => {
    if (userId !== "") fetchCurrentGame();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 to-pink-100 gap-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-purple-600">Hangman</h1>
        
        <button
          onClick={handleRestart}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg px-6 py-3 w-full transition-all duration-200 shadow-md hover:shadow-lg mb-6"
        >
          New Game
        </button>

        {wrongGuesses === 6 && !isWin && (
          <div className="bg-red-500 text-white font-bold text-2xl text-center rounded-lg p-4 mb-4 shadow-lg">
            💀 Game Over - You Lose
          </div>
        )}
        {isWin && wrongGuesses !== 6 && (
          <div className="bg-green-500 text-white font-bold text-2xl text-center rounded-lg p-4 mb-4 shadow-lg">
            🎉 You Win!
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-center mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 font-semibold mb-2">Wrong Guesses</p>
              <p className="text-4xl font-bold text-red-600">{wrongGuesses}/6</p>
            </div>
          </div>
          <HangmanDrawing wrongGuesses={wrongGuesses} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <HangmanWord wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Keyboard
            handleGuess={handleGuess}
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
          />
        </div>
      </div>
    </div>
  );
}

export default HangmanBoard;
