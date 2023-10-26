import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = await axios.get(`http://localhost:3003${baseUrl}`);
  return request.data;
};

export default { getAll };
