import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, createUser } from "./homeThunks";

export interface userState {
  userId: string;
  clueId: string;
  ticTacId: string;
  connectFourId: string;
  hangmanId: string;
  loading: boolean;
  error: string | null;
}

const initialState: userState = {
  userId: "",
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
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.userId = action.payload[0].userId || state.userId;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // createUser
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserId, setClueGame, setTicTacToeGame, clearError } =
  userSlice.actions;

export default userSlice.reducer;
