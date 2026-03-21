import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_NEW_API_URL;

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      if (userId === "") {
        return null;
      }
      const response = await fetch(`${API_URL}/user/${userId}`);
      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      if (userId === "") {
        return null;
      }
      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
