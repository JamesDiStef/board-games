import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_NEW_API_URL;

export const updateHangmanGame = createAsyncThunk(
  "hangman/updateGame",
  async (
    { userId, stuffToPatch }: { userId: string; stuffToPatch: any },
    { rejectWithValue }
  ) => {
    try {
      if (userId === "") {
        return null;
      }
      const response = await fetch(`${API_URL}/hangman/${userId}`, {
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
