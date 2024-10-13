import axios from "../utils/config.util";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const deleteRange = (ids: number[]) => {
  return axios
    .post(`${API_URL}task/deleteRange`, { ids })
    .then(({ data }) => data);
};

const get = (filters: {}) => {
  return axios.post(`${API_URL}task/list`, filters).then(({ data }) => data);
};

const find = (id: number) => {
  return axios.get(`${API_URL}task/find/${id}`).then(({ data }) => data);
};

const create = (payload) => {
  return axios.post(API_URL + "task/create", payload).then(({ data }) => data);
};

const update = (payload) => {
  return axios.post(API_URL + "task/update", payload).then(({ data }) => data);
};

const TaskService = {
  get,
  create,
  update,
  find,
  deleteRange,
};

export default TaskService;
