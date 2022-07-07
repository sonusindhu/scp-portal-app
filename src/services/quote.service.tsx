import axios from "../utils/config.util";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const deleteRange = (ids: number[]) => {
  return axios
    .post(`${API_URL}quote/deleteRange`, { ids })
    .then(({ data }) => data);
};

const find = (id) => {
  return axios.get(`${API_URL}quote/find/${id}`)
    .then(({ data }) => data)
    .then((data) => {
      return {
        ...data,
        result: {
          ...data.result,
          cargoDetail: {
            ...data.result.cargoDetail,
            cargoTypeId: data.result.cargoDetail.cargoTypeId || undefined,
            equipmentId: data.result.cargoDetail.equipmentId || undefined,
            commodityId: data.result.cargoDetail.commodityId || undefined,
          }
        }
      }
    });
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

const getEquipments = () => {
  return axios.get(API_URL + "common/getEquipments").then(({ data }) => data);
};
const getCommodities = () => {
  return axios.get(API_URL + "common/getCommodities").then(({ data }) => data);
};
const getCargos = () => {
  return axios.get(API_URL + "common/getCargos").then(({ data }) => data);
};

const createNote = (payload) => {
  return axios.post(API_URL + "quote/createNote", payload).then(({ data }) => data);
};

const getNotes = (id, filter?) => {
  return axios.post(API_URL + `quote/${id}/notes`, { ...filter }).then(({ data }) => data.result);
};

const createTask = (payload) => {
  return axios.post(API_URL + "quote/createTask", payload).then(({ data }) => data);
};

const getTasks = (id, filter?) => {
  return axios.post(API_URL + `quote/${id}/tasks`, { ...filter }).then(({ data }) => data.result);
};

const QuoteService = {
  create,
  update,
  find,
  deleteRange,
  getCompanies,
  getContactsByCompany,
  getEquipments,
  getCommodities,
  getCargos,
  createNote,
  getNotes,
  createTask,
  getTasks
};

export default QuoteService;
