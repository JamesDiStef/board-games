import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_NEW_API_URL;

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userId, password }: { userId: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, password }),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return { userId: data.userId };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ userId, password }: { userId: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, password }),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return { userId: data.userId };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Called on app load to silently restore session from the HttpOnly cookie.
// If the cookie exists and is valid the server returns { userId }.
// If not, it returns 401 and the rejected case is simply ignored.
export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });
      if (!response.ok) return rejectWithValue("No active session");
      const data = await response.json();
      return { userId: data.userId };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
