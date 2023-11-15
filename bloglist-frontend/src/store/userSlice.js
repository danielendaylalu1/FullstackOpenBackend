import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import blogService from "../services/blogs";
import { setNotification } from "./notificationSlice";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    signUser(state, action) {
      return (state = action.payload);
    },
  },
});

export const handleUser = (data) => {
  return async (dispatch) => {
    try {
      const user = await userService.login(data);
      console.log(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setTocken(user.tocken);
      dispatch(signUser(user));
      dispatch(setNotification(`logged in succesfully`));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };
};

export const { signUser } = userSlice.actions;
export default userSlice.reducer;
