import { Link } from "react-router-dom";

function Users({ users }) {
  return (
    <div>
      {users.length > 0 &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <Link to={`${user.id}`}>{user.name} ------</Link>
              <span>{user.blogs.length}</span> blogs
            </div>
          );
        })}
    </div>
  );
}

export default Users;
