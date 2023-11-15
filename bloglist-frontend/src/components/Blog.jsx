import { useState } from "react";

import { handleDelete, handleLike } from "../store/blogSlice";
import { useDispatch } from "react-redux";

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <h3 className="card">
        {blog.title}{" "}
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? "hide" : "View"}
        </button>
      </h3>
      {showDetail && (
        <div className="card">
          link:<a href={blog.url}> {blog.url}</a>
          <p>
            likes: {blog.likes}{" "}
            <button
              type="button"
              onClick={() => {
                dispatch(
                  handleLike({ ...blog, likes: blog.likes + 1 }, blog.id)
                );
              }}
            >
              Like
            </button>
          </p>
          <p>author: {blog.author}</p>
          <p>name: {blog.user.name}</p>
          <button
            type="button"
            onClick={() => {
              dispatch(handleDelete(blog, blog.id));
              setShowDetail(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
