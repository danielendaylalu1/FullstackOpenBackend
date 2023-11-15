import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Login from "./components/Login";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./store/notificationSlice";
import { getBlogs } from "./store/blogSlice";
import { signUser, handleUser } from "./store/userSlice";
import { handleUsers } from "./store/usersSlice";
import { Route, Routes, useMatch } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import User from "./pages/User";
import Blog from "./pages/Blog";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const message = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  const [err, setErr] = useState(false);

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
    dispatch(handleUsers());
    console.log(users);
  }, []);

  const matchUser = useMatch("/users/:id");
  const selectdeUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;
  return (
    <div>
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
          <Routes>
            <Route path="/" element={<Home user={user} />}>
              <Route path="/users" element={<Users users={users} />} />
              <Route path="/users/:id" element={<User user={selectdeUser} />} />
              <Route
                path="/blogs"
                element={<Blogs user={user} blogs={blogs} />}
              />
              <Route
                path="/blogs/:id"
                element={<Blog user={user} blog={blog} />}
              />
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
