const Login = ({
  setUsername,
  setPassword,
  password,
  username,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </div>
      <div>
        username
        <input
          type="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
    </form>
  );
};

export default Login;
