import axios from "../utils/config.util";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const deleteRange = (ids: number[]) => {
  return axios
    .post(`${API_URL}quote/deleteRange`, { ids })
    .then(({ data }) => data);
};

const find = (id) => {
  return axios.get(`${API_URL}quote/find/${id}`).then(({ data }) => data);
};

const create = (payload) => {
  return axios.post(API_URL + "quote/create", payload).then(({ data }) => data);
};

const update = (payload) => {
  return axios.post(API_URL + "quote/update", payload).then(({ data }) => data);
};

const getCompanies = () => {
  return axios.get(API_URL + "quote/getCompanies").then(({ data }) => data);
};

const getContactsByCompany = (id: number) => {
  return axios
    .get(API_URL + `quote/getContactsByCompany/${id}`)
    .then(({ data }) => data);
};

const QuoteService = {
  create,
  update,
  find,
  deleteRange,
  getCompanies,
  getContactsByCompany,
};

export default QuoteService;
