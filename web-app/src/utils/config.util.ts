import axios from "axios";
import AuthService from "../services/auth.service";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  function (config: any) {
    const user = AuthService.getCurrentUser();
    if (user) {
      if (!config.headers) config.headers = {};
      config.headers["token"] = user.token;
    }
    // Fix: ensure config.headers exists and use correct CORS header
    if (!config.headers) config.headers = {};
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
