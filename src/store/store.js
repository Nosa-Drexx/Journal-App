import { configureStore } from "@reduxjs/toolkit";
import { todolistSlice } from "./todolistSlice";

export const store = configureStore({
  reducer: {
    todos: todolistSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

const theme = document.documentElement;

const themes = localStorage.getItem("color")
  ? JSON.parse(localStorage.getItem("color"))
  : null;

if (themes) {
  theme?.style.setProperty("--black", themes.black);
  theme?.style.setProperty("--white", themes.white);
  theme?.style.setProperty("--boxShadow", themes.boxShadow);
  theme?.style.setProperty("--lightWhite", themes.lightWhite);
}
