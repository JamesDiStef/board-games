import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_NEW_API_URL;

export const fetchClueGame = createAsyncThunk(
  "clue/fetchGame",
  async (playerName: string, { rejectWithValue }) => {
    try {
      if (playerName === "") {
        return null;
      }
      const response = await fetch(`${API_URL}/clue/${playerName}`);
      const game = await response.json();
      return game;
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
      if (playerName === "") {
        return null;
      }
      const response = await fetch(`${API_URL}/clue/${playerName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });
      const game = await response.json();
      return game;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const saveClueGameState = createAsyncThunk(
  "clue/saveGameState",
  async (
    { gameId, stuffToPatch }: { gameId: string; stuffToPatch: any },
    { rejectWithValue }
  ) => {
    try {
      if (gameId === "") {
        return null;
      }
      const response = await fetch(`${API_URL}/clue/${gameId}`, {
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
