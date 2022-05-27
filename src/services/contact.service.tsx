import axios from "../utils/config.util";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const deleteContacts = (ids: number[]) => {
  return axios
    .post(`${API_URL}contact/deleteRange`, { ids })
    .then(({ data }) => data);
};

const find = (id: number) => {
  return axios.get(`${API_URL}contact/find/${id}`).then(({ data }) => data);
};

const create = (payload) => {
  return axios
    .post(API_URL + "contact/create", payload)
    .then(({ data }) => data);
};

const update = (payload) => {
  return axios
    .post(API_URL + "contact/update", payload)
    .then(({ data }) => data);
};

const CompanyService = {
  create,
  update,
  find,
  deleteContacts,
};

export default CompanyService;
