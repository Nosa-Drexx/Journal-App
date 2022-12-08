import { configureStore } from "@reduxjs/toolkit";
import { todolistSlice } from "./todolistSlice";

export const store = configureStore({
  reducer: {
    todos: todolistSlice.reducer,
  },
});
