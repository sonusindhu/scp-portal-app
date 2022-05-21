import axios from "axios";
import AuthService from "../services/auth.service";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  function (config) {
    const user = AuthService.getCurrentUser();
    if (user) {
      config.headers.common["token"] = user.token;
    }
    config.headers.common["allowOrigins"] = "*";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
