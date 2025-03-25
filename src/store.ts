import { configureStore } from "@reduxjs/toolkit";
import clueReducer from "./clue/clueSlice";
import userReducer from "./home/homeSlice";
import ticTacToeReducer from "./tickTackToe/ticTacSlice";
import connectFourReducer from "./connectFour/connectFourSlice";

export const store = configureStore({
  reducer: {
    clue: clueReducer,
    user: userReducer,
    ticTacToe: ticTacToeReducer,
    connectFour: connectFourReducer,
  },
});
