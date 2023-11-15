import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationSlice";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    initiateBlogs(state, action) {
      return (state = action.payload);
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(initiateBlogs(blogs));
  };
};

export const createBlogs = (data) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(data);
      dispatch(addBlog(blog));
      dispatch(
        setNotification(`a new blog ${blog.title} by ${blog.author} added`)
      );
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };
};

export const { initiateBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;
