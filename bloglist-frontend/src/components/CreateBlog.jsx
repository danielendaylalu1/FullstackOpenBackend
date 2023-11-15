import { useState } from "react";
import blogService from "../services/blogs";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setNotification } from "../store/notificationSlice";

const CreateBlog = ({
  setBlogs,
  setErr,
  blogs,
  setIsFormVisible,
  user,
  isFormVisible,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const blogHandler = async (e) => {
    e.preventDefault();
    console.log({
      title,
      author,
      url,
      userId: user.user.id,
    });
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
        userId: user.user.id,
      });
      // blogs.concat(blog);
      setErr(false);

      dispatch(
        setNotification(`a new blog ${blog.title} by ${blog.author} added`)
      );
      setTimeout(() => {
        // setMessage("");
        dispatch(setNotification(null));
      }, 4000);
      setBlogs(blogs.concat(blog));
      setIsFormVisible(!isFormVisible);
      console.log(blog);
    } catch (error) {
      console.log(error);
      setErr(true);

      dispatch(setNotification(error.response.data.error));
    }
  };
  return (
    <form onSubmit={blogHandler}>
      <h2>Create new</h2>
      <div>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

CreateBlog.propTypes = {
  setBlogs: propTypes.func.isRequired,
  setMessage: propTypes.func.isRequired,
  setErr: propTypes.func.isRequired,
  blogs: propTypes.array.isRequired,
  setIsFormVisible: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  isFormVisible: propTypes.bool.isRequired,
};

export default CreateBlog;
