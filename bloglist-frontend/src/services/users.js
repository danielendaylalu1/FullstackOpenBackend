import axios from "axios";
const baseUrl = "/api/users/login";

const login = async (user) => {
  const request = await axios.post(`http://localhost:3003${baseUrl}`, user);
  return request.data;
};

export default { login };
