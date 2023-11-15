import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import blogSlice from "./blogSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
  },
});

export default store;
