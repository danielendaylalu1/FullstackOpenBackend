import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getUsers(state, action) {
      return (state = action.payload);
    },
  },
});

export const handleUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers();
    dispatch(getUsers(users));
  };
};

export const { getUsers } = usersSlice.actions;
export default usersSlice.reducer;
