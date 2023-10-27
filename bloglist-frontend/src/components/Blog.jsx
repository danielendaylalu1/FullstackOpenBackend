import { useState } from "react";

const Blog = ({ blog, user }) => {
  const [showDetail, setShowDetail] = useState(false);
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
          <a href={blog.url}>{blog.url}</a>
          <p>
            likes: {blog.likes} <button>Like</button>
          </p>
          <p>{blog.author}</p>
          <p>{user.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
