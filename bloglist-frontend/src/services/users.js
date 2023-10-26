const create = async (user) => {
  const request = await axios.post("/api/users/login", user);
  return request.data;
};

export default { create };
