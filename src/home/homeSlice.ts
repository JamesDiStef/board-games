import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  userId: string;
  clueId: string;
  ticTacId: string;
  connectFourId: string;
  hangmanId: string;
}

const initialState: userState = {
  userId: "",
  clueId: "",
  ticTacId: "",
  connectFourId: "",
  hangmanId: "",
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
  },
});

export const { setUserId, setClueGame, setTicTacToeGame } = userSlice.actions;

export default userSlice.reducer;
