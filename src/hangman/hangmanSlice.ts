import { createSlice } from "@reduxjs/toolkit";

interface hangmanSliceInterface {
  isWin: boolean;
  wordToGuess: string;
  guessedLetters: string[];
  wrongGuesses: number;
}

const initialState: hangmanSliceInterface = {
  isWin: false,
  wordToGuess: "",
  guessedLetters: [],
  wrongGuesses: 0,
};

export const hangmanSlice = createSlice({
  name: "hangman",
  initialState,
  reducers: {
    setIsWin: (state, action) => {
      state.isWin = action.payload;
    },
    setGuessedLetters: (state, action) => {
      state.guessedLetters = action.payload;
    },
    setWrongGuesses: (state, action) => {
      state.wrongGuesses = action.payload;
    },
    setGame: (state, action) => {
      state.wordToGuess = action.payload.wordToGuess;
      state.isWin = action.payload.isWin;
      state.guessedLetters = action.payload.guessedLetters;
      state.wrongGuesses = action.payload.wrongGuesses;
    },
  },
});

export const { setIsWin, setGuessedLetters, setWrongGuesses, setGame } =
  hangmanSlice.actions;

export default hangmanSlice.reducer;
