import { useEffect, useState } from "react";
import CreateBlog from "../components/CreateBlog";

import { Link } from "react-router-dom";

const Blogs = ({ user, setErr, blogs }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div>
      <h2>Blogs</h2>
      <p>...................................</p>
      {isFormVisible ? (
        <>
          <CreateBlog
            setErr={setErr}
            setIsFormVisible={setIsFormVisible}
            blogs={blogs}
            user={user}
            isFormVisible={isFormVisible}
          />
          <div>
            <button
              onClick={() => {
                setIsFormVisible(!isFormVisible);
              }}
            >
              cancel
            </button>
          </div>
        </>
      ) : (
        <div>
          <button
            onClick={() => {
              setIsFormVisible(!isFormVisible);
            }}
          >
            new Blog
          </button>
        </div>
      )}
      <p>...................................</p>
      <div>
        {blogs.map((blog, index) => {
          return (
            <p key={index}>
              <Link to={`${blog.id}`}>{blog.title}</Link>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
