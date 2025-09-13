import axios from "../utils/config.util";
const API_URL = import.meta.env.VITE_API_ENDPOINT;

const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    password,
  });
};

const login = (email: string, password: string) => {
  const payload = {
    email,
    password,
  };
  return axios
    .post(API_URL + "auth/login", payload)
    .then(({ data }) => data)
    .then((response) => {
      if (response.status) {
        const userData = response.result;
        localStorage.setItem("user", JSON.stringify(userData));
      }
      return response;
    });
};

const getUserDetail = () => {
  console.log('GET user detail:', API_URL + "user/detail");
  return axios
    .get(API_URL + "user/detail")
    .then(({ data }) => {
      console.log('Response:', data);
      return data;
    })
    .catch((error) => {
      console.error('Axios error:', error);
      throw error;
    });
};

const updateProfile = (payload) => {
  return axios
    .post(API_URL + "user/update", payload)
    .then(({ data }) => data);
};

const updatePassword = (payload) => {
  return axios
    .post(API_URL + "user/updatePassword", payload)
    .then(({ data }) => data);
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userAuth = localStorage.getItem("user");
  return userAuth ? JSON.parse(userAuth) : null;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserDetail,
  updateProfile,
  updatePassword
};
export default AuthService;
