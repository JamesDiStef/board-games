import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchMe } from "./homeThunks";

export interface userState {
  userId: string;
  isAuthenticated: boolean;
  clueId: string;
  ticTacId: string;
  connectFourId: string;
  hangmanId: string;
  loading: boolean;
  error: string | null;
}

const initialState: userState = {
  userId: "",
  isAuthenticated: false,
  clueId: "",
  ticTacId: "",
  connectFourId: "",
  hangmanId: "",
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setAuth: (state, action: { payload: { userId: string } }) => {
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.userId = "";
      state.isAuthenticated = false;
    },
    setClueGame: (state, action) => {
      state.clueId = action.payload;
    },
    setTicTacToeGame: (state, action) => {
      state.ticTacId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetchMe — silent session restore on app load
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
      });
  },
});

export const { setUserId, setAuth, clearAuth, setClueGame, setTicTacToeGame, clearError } =
  userSlice.actions;

export default userSlice.reducer;
