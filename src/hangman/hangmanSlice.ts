import { createSlice } from "@reduxjs/toolkit";
import { updateHangmanGame } from "./hangmanThunks";

interface hangmanSliceInterface {
  isWin: boolean;
  wordToGuess: string;
  guessedLetters: string[];
  wrongGuesses: number;
  loading: boolean;
  error: string | null;
}

const initialState: hangmanSliceInterface = {
  isWin: false,
  wordToGuess: "",
  guessedLetters: [],
  wrongGuesses: 0,
  loading: false,
  error: null,
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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // updateHangmanGame
      .addCase(updateHangmanGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHangmanGame.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateHangmanGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setIsWin, setGuessedLetters, setWrongGuesses, setGame, clearError } =
  hangmanSlice.actions;

export default hangmanSlice.reducer;
