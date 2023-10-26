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
  };
  const getBlogs = async () => {
    try {
      const result = await blogService.getAll();
      console.log(result);
      setBlogs(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    getBlogs();
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
        blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
      )}
    </div>
  );
};

export default App;
