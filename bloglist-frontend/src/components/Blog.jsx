import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleLike = async (blog, id) => {
    const updatedBlog = await blogService.like(blog, id);
    setBlogs((prv) => {
      return prv.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return (blog = updatedBlog);
        }
        return blog;
      });
    });
  };
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
                handleLike({ ...blog, likes: blog.likes + 1 }, blog.id);
              }}
            >
              Like
            </button>
          </p>
          <p>author: {blog.author}</p>
          <p>name: {blog.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
