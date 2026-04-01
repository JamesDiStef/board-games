import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_NEW_API_URL;

export const fetchConnectFourGame = createAsyncThunk(
  "connectFour/fetchGame",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/connectFour/${userId}`, {
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createConnectFourGame = createAsyncThunk(
  "connectFour/createGame",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/connectFour/${userId}`, {
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

export const saveConnectFourGame = createAsyncThunk(
  "connectFour/saveGame",
  async (
    { userId, stuffToPatch }: { userId: string; stuffToPatch: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_URL}/connectFour/${userId}`, {
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
