import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { setNotification } from "../store/notificationSlice";
import { signUser } from "../store/userSlice";

const Home = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <p>..................................</p>
      <Link to="/">Home</Link>
      <br />
      <Link to="/users">users</Link>
      <br />
      <Link to="/blogs">blogs</Link>
      <p>..................................</p>
      <h3>{user.user.name} logged in </h3>
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
      <p>..................................</p>
      <Outlet />
    </div>
  );
};

export default Home;
