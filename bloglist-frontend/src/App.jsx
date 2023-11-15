import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import userService from "./services/users";
import Login from "./components/Login";
import "./style.css";
import CreateBlog from "./components/CreateBlog";
import Blog from "./components/Blog";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./store/notificationSlice";
import { getBlogs } from "./store/blogSlice";
import { signUser, handleUser } from "./store/userSlice";

const App = () => {
  const blogs = useSelector((state) => state.blogs);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const message = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const user = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(handleUser({ username, password }));
      setErr(false);

      setPassword("");
      setUsername("");
    } catch (error) {
      const errormesage = error.response.data.error;
      setErr(true);
      dispatch(setNotification(errormesage));
      console.log(errormesage);
    }
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(signUser(user));
      blogService.setTocken(user.tocken);
    }
    dispatch(getBlogs());
  }, []);

  return (
    <div>
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
                dispatch(setNotification(null));
                dispatch(signUser(null));
              }}
            >
              Logout
            </button>
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
          </h3>
          <div>
            {blogs.map((blog, index) => {
              return <Blog blog={blog} key={index} user={user} blogs={blogs} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
