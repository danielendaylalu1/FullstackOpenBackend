import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/users";
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await userService.login({ username, password });
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getBlog = async () => {
    try {
      const result = await blogService.getOne("2");
      console.log(result);
      setBlogs(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    getBlog();
  }, []);

  return (
    <div>
      <h2>blogs</h2>
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
        <div>blogs</div>
      )}
    </div>
  );
};

export default App;
