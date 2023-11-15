import axios from "axios";
const baseUrl = "/api/users";

const login = async (user) => {
  const request = await axios.post(
    `http://localhost:3003${baseUrl}/login`,
    user
  );
  return request.data;
};

const getAllUsers = async () => {
  const result = await axios.get(`http://localhost:3003${baseUrl}`);
  return result.data;
};

export default { login, getAllUsers };
