import { configureStore } from "@reduxjs/toolkit";
import clueReducer from "./clue/clueSlice";
import userReducer from "./home/homeSlice";

export const store = configureStore({
  reducer: { clue: clueReducer, user: userReducer },
});
