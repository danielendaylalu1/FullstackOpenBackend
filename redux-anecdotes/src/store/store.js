import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlice from "./anecdoteSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    anecdote: anecdoteSlice,
    filter: filterSlice,
  },
});

export default store;
