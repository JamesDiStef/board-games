import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_NEW_API_URL;

export const fetchClueGame = createAsyncThunk(
  "clue/fetchGame",
  async (playerName: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/clue/${playerName}`, {
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createClueGame = createAsyncThunk(
  "clue/createGame",
  async (
    { playerName, gameData }: { playerName: string; gameData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_URL}/clue/${playerName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(gameData),
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const saveClueGameState = createAsyncThunk(
  "clue/saveGameState",
  async (
    { playerName, stuffToPatch }: { playerName: string; stuffToPatch: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_URL}/clue/${playerName}`, {
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
