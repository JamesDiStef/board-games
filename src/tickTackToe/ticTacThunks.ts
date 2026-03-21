import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_NEW_API_URL;

export const fetchCurrentGame = createAsyncThunk(
  "ticTacToe/fetchCurrentGame",
  async (userId: string, { rejectWithValue }) => {
    try {
      if (userId === "") {
        return null;
      }
      const response = await fetch(`${API_URL}/ticTacToe/${userId}`);
      const game = await response.json();
      return game;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createNewGame = createAsyncThunk(
  "ticTacToe/createNewGame",
  async (userId: string, { rejectWithValue }) => {
    try {
      if (userId === "") {
        return null;
      }
      const response = await fetch(`${API_URL}/ticTacToe/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const game = await response.json();
      return game;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateTicTacToeGame = createAsyncThunk(
  "ticTacToe/updateGame",
  async (
    { userId, stuffToPatch }: { userId: string; stuffToPatch: any },
    { rejectWithValue }
  ) => {
    try {
      if (userId === "") {
        return null;
      }
      const response = await fetch(`${API_URL}/ticTacToe/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stuffToPatch),
      });
      const game = await response.json();
      return game;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
