import axios from "../config";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const deleteCompanies = (ids) => {
  return axios.post(`${API_URL}company/company/deleteRange`, { ids });
};

const find = (id) => {
  return axios.get(`${API_URL}company/find/${id}`).then(({ data }) => data);
};

const create = (payload) => {
  axios.post(API_URL + "company/create", payload).then(({ data }) => data);
};

const update = (payload) => {
  axios.post(API_URL + "company/update", payload).then(({ data }) => data);
};

const CompanyService = {
  create,
  update,
  find,
  deleteCompanies,
};

export default CompanyService;
