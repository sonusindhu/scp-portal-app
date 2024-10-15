import axios from "../utils/config.util";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const deleteRange = (ids: number[]) => {
  return axios
    .post(`${API_URL}note/deleteRange`, { ids })
    .then(({ data }) => data);
};

const get = (filters = {}) => {
  return axios.post(`${API_URL}note/list`, filters).then(({ data }) => data);
};

const find = (id: number) => {
  return axios.get(`${API_URL}note/find/${id}`).then(({ data }) => data);
};

const create = (payload) => {
  return axios.post(API_URL + "note/create", payload).then(({ data }) => data);
};

const update = (payload) => {
  return axios.post(API_URL + "note/update", payload).then(({ data }) => data);
};

const NoteService = {
  get,
  create,
  update,
  find,
  deleteRange,
};

export default NoteService;
