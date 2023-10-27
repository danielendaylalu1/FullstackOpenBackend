import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import userService from "./services/users";
import Login from "./components/Login";
import "./style.css";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
            {isFormVisible ? (
              <>
                <CreateBlog
                  setBlogs={setBlogs}
                  setErr={setErr}
                  setMessage={setMessage}
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
                  newNote
                </button>
              </div>
            )}
          </h3>
          <div>
            {blogs.map((blog, index) => {
              return <Blog blog={blog} key={index} user={user} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
