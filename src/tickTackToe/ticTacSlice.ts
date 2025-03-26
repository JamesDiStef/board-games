import { createSlice } from "@reduxjs/toolkit";

interface Square {
  num: number;
  value: string;
}

export interface ticTacSlice {
  numClicks: number;
  isPlayerOne: boolean;
  isGameOver: boolean;
  board: Square[];
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
  },
});

export const {
  setNumClick,
  setIsGameOver,
  setIsPlayerOne,
  setBoardUpdate,
  setUpGame,
} = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;
