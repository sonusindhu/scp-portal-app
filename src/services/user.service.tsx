import axios from "../utils/config.util";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const getPublicContent = () => {
  return axios.get(API_URL + "all").then( (data) => data);
};

const getUserBoard = () => {
  return axios.get(API_URL + "user").then( (data) => data);
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod").then( (data) => data);
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin").then( (data) => data);
};

const uploadUserImage = (payload) => {
  return axios.post(API_URL + "admin", payload).then( (data) => data);
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  uploadUserImage
};

export default UserService;

