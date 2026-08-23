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
        // Use standard Authorization header with Bearer token
        config.headers["Authorization"] = `Bearer ${user.token}`;
    }
      // Ensure headers object exists
      if (!config.headers) config.headers = {};
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
