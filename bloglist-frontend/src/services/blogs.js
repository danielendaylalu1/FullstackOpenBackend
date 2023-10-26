import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = await axios.get(`http://localhost:3003${baseUrl}`);
  return request.data;
};

const getOne = async (id) => {
  const request = await axios.get(`http://localhost:3003${baseUrl}/${id}`);
  return request.data;
};

export default { getAll, getOne };
