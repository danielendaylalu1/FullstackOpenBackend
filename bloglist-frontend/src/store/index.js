import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";
import blogSlice from "./blogSlice";
import userSlice from "./userSlice";
import usersSlice from "./usersSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
    user: userSlice,
    users: usersSlice,
  },
});

export default store;
