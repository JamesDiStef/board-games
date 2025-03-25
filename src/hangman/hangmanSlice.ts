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
    setWordtoGuess: (state, action) => {
      state.wordToGuess = action.payload;
    },
    setIsWin: (state, action) => {
      state.isWin = action.payload;
    },
    setGuessedLetters: (state, action) => {
      state.guessedLetters = action.payload;
    },
    setWrongGuesses: (state, action) => {
      state.wrongGuesses = action.payload;
    },
  },
});

export const { setWordtoGuess, setIsWin, setGuessedLetters, setWrongGuesses } =
  hangmanSlice.actions;

export default hangmanSlice.reducer;
