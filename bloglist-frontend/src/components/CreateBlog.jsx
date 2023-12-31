import { useState } from "react";
import blogService from "../services/blogs";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setNotification } from "../store/notificationSlice";
import { createBlogs } from "../store/blogSlice";

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
    try {
      setErr(false);
      dispatch(
        createBlogs({
          title,
          author,
          url,
          userId: user.user.id,
        })
      );
      setIsFormVisible(!isFormVisible);
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
  setErr: propTypes.func.isRequired,
  blogs: propTypes.array.isRequired,
  setIsFormVisible: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  isFormVisible: propTypes.bool.isRequired,
};

export default CreateBlog;
