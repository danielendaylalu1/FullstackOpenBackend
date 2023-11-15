import axios from "axios";
const baseUrl = "/api/blogs";

let tocken = null;

const setTocken = (newTocken) => {
  console.log(newTocken);
  tocken = `Bearer ${newTocken}`;
  console.log(tocken);
};

const getAll = async () => {
  const request = await axios.get(`http://localhost:3003${baseUrl}`);
  return request.data;
};

const create = async (user) => {
  const config = {
    headers: { Authorization: tocken },
  };
  console.log(config, tocken);
  const request = await axios.post(
    `http://localhost:3003${baseUrl}/`,
    user,
    config
  );
  return request.data;
};
const like = async (blog, id) => {
  const request = await axios.put(
    `http://localhost:3003${baseUrl}/${id}`,
    blog
  );
  return request.data;
};

const removeBlog = async (id) => {
  const request = await axios.delete(`http://localhost:3003${baseUrl}/${id}`);
  return request.data;
};

export default { getAll, create, setTocken, tocken, like, removeBlog };
