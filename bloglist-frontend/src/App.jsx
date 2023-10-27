import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import userService from "./services/users";
import Login from "./components/Login";
import "./style.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(false);

  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await userService.login({ username, password });
      console.log(data);
      window.localStorage.setItem("user", JSON.stringify(data));
      blogService.setTocken(data.tocken);
      setUser(data);
      setBlogs(data.user.blogs);
      setMessage(`logged in succesfully`);
      setErr(false);
      setTimeout(() => {
        setMessage("");
      }, 4000);
      setPassword("");
      setUsername("");
    } catch (error) {
      const errormesage = error.response.data.error;
      setErr(true);
      setMessage(errormesage);
      console.log(errormesage);
    }
  };
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
      setMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setMessage("");
      }, 4000);
      setBlogs(blogs.concat(blog));
      console.log(blog);
    } catch (error) {
      console.log(error);
      setErr(true);
      setMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setBlogs(user.user.blogs);
      blogService.setTocken(user.tocken);
    }
  }, []);

  return (
    <div>
      {/* <h2>blogs</h2> */}
      <h2>wellcome</h2>
      {message && <p className={err ? `error` : `success`}>{message}</p>}
      {user === null ? (
        <Login
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      ) : (
        // blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        <div>
          <h1>Blogs</h1>
          <h3>
            {user.user.name} logged in{" "}
            <button
              type="button"
              onClick={() => {
                console.log("deleted");
                window.localStorage.removeItem("user");
                setMessage(null);
                setUser(null);
              }}
            >
              Logout
            </button>
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
          </h3>
          <div>
            {blogs.map((blog, index) => {
              return <p key={index}>{blog.title}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
