import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleLike } from "../store/blogSlice";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  if (!blog) {
    return null;
  }

  return (
    <div className="card">
      <h3>{blog.title} </h3>

      <div>
        link:<a href={blog.url}> {blog.url}</a>
        <p>
          likes: {blog.likes}{" "}
          <button
            type="button"
            onClick={() => {
              console.log(blog);
              dispatch(handleLike({ ...blog, likes: blog.likes + 1 }, blog.id));
            }}
          >
            Like
          </button>
        </p>
        <p>author: {blog.author}</p>
        <p>name: {blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;
