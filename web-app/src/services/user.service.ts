import axios from "../utils/config.util";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const uploadUserImage = (payload) => {
  return axios.post(API_URL + "user/uploadProfileImage", payload)
    .then( (response) => response.data);
};

const UserService = {
  uploadUserImage
};

export default UserService;

