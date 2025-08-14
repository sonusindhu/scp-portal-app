import axios from "../utils/config.util";
const API_URL = "https://scp-portal-api.onrender.com/api/v1/app/"; //process.env.REACT_APP_API_ENDPOINT;

const deleteCompanies = (ids: number[]) => {
  return axios
    .post(`${API_URL}company/deleteRange`, { ids })
    .then(({ data }) => data);
};

const find = (id?) => {
  return axios.get(`${API_URL}company/find/${id}`).then(({ data }) => data);
};

const create = (payload) => {
  debugger
  return axios
    .post(API_URL + "company/create", payload)
    .then(({ data }) => data);
};

const update = (payload) => {
  return axios
    .post(API_URL + "company/update", payload)
    .then(({ data }) => data);
};

const CompanyService = {
  create,
  update,
  find,
  deleteCompanies,
};

export default CompanyService;
