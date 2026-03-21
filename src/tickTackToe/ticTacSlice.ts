import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentGame,
  createNewGame,
  updateTicTacToeGame,
} from "./ticTacThunks";

interface Square {
  num: number;
  value: string;
}

export interface ticTacSlice {
  numClicks: number;
  isPlayerOne: boolean;
  isGameOver: boolean;
  board: Square[];
  loading: boolean;
  error: string | null;
}

const initialState: ticTacSlice = {
  numClicks: 0,
  isPlayerOne: true,
  isGameOver: false,
  board: [
    { num: 0, value: "" },
    { num: 1, value: "" },
    { num: 2, value: "" },
    { num: 3, value: "" },
    { num: 4, value: "" },
    { num: 5, value: "" },
    { num: 6, value: "" },
    { num: 7, value: "" },
    { num: 8, value: "" },
  ],
  loading: false,
  error: null,
};

export const ticTacToeSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    setNumClick: (state) => {
      state.numClicks = state.numClicks + 1;
    },
    setIsPlayerOne: (state) => {
      state.isPlayerOne = !state.isPlayerOne;
    },
    setIsGameOver: (state, action) => {
      state.isGameOver = action.payload;
    },
    setUpGame: (state, action) => {
      state.board = action.payload.board;
      state.numClicks = action.payload.numClicks;
      state.isPlayerOne = action.payload.isPlayerOne;
      state.isGameOver = action.payload.isGameOver;
    },
    setBoardUpdate: (state, action) => {
      state.board = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetGameState: (state) => {
      state.numClicks = 0;
      state.isPlayerOne = true;
      state.isGameOver = false;
      state.board = [
        { num: 0, value: "" },
        { num: 1, value: "" },
        { num: 2, value: "" },
        { num: 3, value: "" },
        { num: 4, value: "" },
        { num: 5, value: "" },
        { num: 6, value: "" },
        { num: 7, value: "" },
        { num: 8, value: "" },
      ];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCurrentGame
      .addCase(fetchCurrentGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentGame.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.board = action.payload[0].board;
          state.numClicks = action.payload[0].numClicks;
          state.isPlayerOne = action.payload[0].isPlayerOne;
          state.isGameOver = action.payload[0].isGameOver;
        }
      })
      .addCase(fetchCurrentGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // createNewGame
      .addCase(createNewGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewGame.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // updateTicTacToeGame
      .addCase(updateTicTacToeGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTicTacToeGame.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTicTacToeGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setNumClick,
  setIsGameOver,
  setIsPlayerOne,
  setBoardUpdate,
  setUpGame,
  clearError,
  resetGameState,
} = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;
