import axios from "../utils/config.util";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const deleteRange = (ids: number[]) => {
  return axios
    .post(`${API_URL}email/deleteRange`, { ids })
    .then(({ data }) => data);
};

const get = (filters: {}) => {
  return axios.post(`${API_URL}email/list`, filters).then(({ data }) => data);
};

const find = (id: number) => {
  return axios.get(`${API_URL}email/find/${id}`).then(({ data }) => data);
};

const create = (payload) => {
  return axios.post(API_URL + "email/create", payload).then(({ data }) => data);
};

const update = (payload) => {
  return axios.post(API_URL + "email/update", payload).then(({ data }) => data);
};

const EmailService = {
  get,
  create,
  update,
  find,
  deleteRange,
};

export default EmailService;
