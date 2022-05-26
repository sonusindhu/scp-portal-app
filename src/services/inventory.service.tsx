import axios from "../utils/config.util";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const deleteCompanies = (ids: number[]) => {
  return axios.post(`${API_URL}inventory/deleteRange`, { ids });
};

const find = (id: number) => {
  return axios.get(`${API_URL}inventory/find/${id}`).then(({ data }) => data);
};

const create = (payload) => {
  return axios
    .post(API_URL + "inventory/create", payload)
    .then(({ data }) => data);
};

const update = (payload) => {
  return axios
    .post(API_URL + "inventory/update", payload)
    .then(({ data }) => data);
};

const CompanyService = {
  create,
  update,
  find,
  deleteCompanies,
};

export default CompanyService;
