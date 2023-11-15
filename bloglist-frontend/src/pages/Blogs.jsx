import { useEffect, useState } from "react";
import CreateBlog from "../components/CreateBlog";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";

const Blogs = ({ user, setErr }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const blogs = useSelector((state) => state.blogs);

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
          return <Blog blog={blog} key={index} user={user} blogs={blogs} />;
        })}
      </div>
    </div>
  );
};

export default Blogs;
