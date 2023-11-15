import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    initiateBlogs(state, action) {
      return (state = action.payload);
    },
  },
});

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(initiateBlogs(blogs));
  };
};

export const { initiateBlogs } = blogSlice.actions;
export default blogSlice.reducer;
