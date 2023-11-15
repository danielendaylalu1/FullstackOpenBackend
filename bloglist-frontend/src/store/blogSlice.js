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
    addLike(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    deleteBlog(state, action) {
      return state.filter((blog) => {
        return blog.id !== action.payload;
      });
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

export const handleLike = (data, id) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.like(data, id);
      dispatch(addLike(updatedBlog));
    } catch (error) {
      console.log(error);
    }
  };
};

export const handleDelete = (blog, id) => {
  return async (dispatch) => {
    try {
      const deletedBlog = await blogService.removeBlog(id);
      dispatch(deleteBlog(id));
      dispatch(setNotification(`blog ${blog.title} by ${blog.author} deleted`));
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 4000);
    } catch (error) {
      id;
      console.log(error);
    }
  };
};

export const { initiateBlogs, addBlog, addLike, deleteBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
