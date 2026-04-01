import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_NEW_API_URL;

export const fetchCurrentGame = createAsyncThunk(
  "ticTacToe/fetchCurrentGame",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/ticTacToe/${userId}`, {
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createNewGame = createAsyncThunk(
  "ticTacToe/createNewGame",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/ticTacToe/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      return await response.json();
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
      const response = await fetch(`${API_URL}/ticTacToe/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(stuffToPatch),
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
