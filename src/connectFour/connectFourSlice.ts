import { createSlice } from "@reduxjs/toolkit";
import {
  fetchConnectFourGame,
  createConnectFourGame,
  saveConnectFourGame,
} from "./connectFourThunks";

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
  loading: boolean;
  error: string | null;
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
  loading: false,
  error: null,
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
    clearError: (state) => {
      state.error = null;
    },
    resetGameState: (state) => {
      state.isRedTurn = true;
      state.isGameOver = false;
      state.columns = Array(7).fill({
        counter: 5,
        squares: [
          { id: 0, color: "" },
          { id: 1, color: "" },
          { id: 2, color: "" },
          { id: 3, color: "" },
          { id: 4, color: "" },
          { id: 5, color: "" },
        ],
      });
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchConnectFourGame
      .addCase(fetchConnectFourGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConnectFourGame.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.columns = action.payload[0].columns;
          state.isRedTurn = action.payload[0].isRedTurn;
          state.isGameOver = action.payload[0].isGameOver;
        }
      })
      .addCase(fetchConnectFourGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // createConnectFourGame
      .addCase(createConnectFourGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConnectFourGame.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createConnectFourGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // saveConnectFourGame
      .addCase(saveConnectFourGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveConnectFourGame.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveConnectFourGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { handleDropPiece, toggleGameOver, restart, clearError, resetGameState } =
  connectFourSlice.actions;

export default connectFourSlice.reducer;
