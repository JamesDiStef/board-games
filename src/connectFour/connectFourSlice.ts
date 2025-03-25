import { createSlice } from "@reduxjs/toolkit";

export interface Column {
  counter: number;
  squares: Square[];
}

export interface Square {
  id: number;
  color: string;
}

export interface ConnectFourState {
  isRedTurn: boolean;
  isGameOver: boolean;
  columns: Column[];
}

const initialState: ConnectFourState = {
  isRedTurn: true,
  isGameOver: false,
  columns: Array(7).fill({
    counter: 5,
    squares: [
      { id: 0, color: "" },
      { id: 1, color: "" },
      { id: 2, color: "" },
      { id: 3, color: "" },
      { id: 4, color: "" },
      { id: 5, color: "" },
    ],
  }),
};

export const connectFourSlice = createSlice({
  name: "connectFour",
  initialState,
  reducers: {
    handleDropPiece: (state, action) => {
      state.columns = action.payload;
      state.isRedTurn = !state.isRedTurn;
    },
    toggleGameOver: (state) => {
      state.isGameOver = !state.isGameOver;
    },
    restart: (state) => {
      state.columns = initialState.columns;
      state.isGameOver = false;
      state.isRedTurn = true;
    },
  },
});

export const { handleDropPiece, toggleGameOver, restart } =
  connectFourSlice.actions;

export default connectFourSlice.reducer;
