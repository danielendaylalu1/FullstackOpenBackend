import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlice from "./anecdoteSlice";
import filterSlice from "./filterSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    anecdote: anecdoteSlice,
    filter: filterSlice,
    notification: notificationSlice,
  },
});

export default store;
