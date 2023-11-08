import axios from "axios";

export const getAll = async () => {
  const result = await axios.get("http://localhost:3001/anecdotes");
  return result.data;
};

export const create = async (data) => {
  const result = await axios.post("http://localhost:3001/anecdotes", data);
  return result.data;
};

export const vote = async (id, data) => {
  const result = await axios.put(`http://localhost:3001/anecdotes/${id}`, data);
  return result.data;
};
