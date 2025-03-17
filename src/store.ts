import { configureStore } from "@reduxjs/toolkit";
import clueReducer from "./clue/clueSlice";

export const store = configureStore({
  reducer: { clue: clueReducer },
});
