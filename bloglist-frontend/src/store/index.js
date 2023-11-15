import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import blogSlice from "./blogSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
    user: userSlice,
  },
});

export default store;
