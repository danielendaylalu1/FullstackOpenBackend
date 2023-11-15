import React from "react";

const User = ({ user }) => {
  console.log(user);
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <p>blogs added</p>
      {user.blogs.length === 0 ? (
        <p>no blog posted by {user.name}</p>
      ) : (
        user.blogs.map((blog, index) => {
          return <li key={index}>{blog.title}</li>;
        })
      )}
    </div>
  );
};

export default User;
