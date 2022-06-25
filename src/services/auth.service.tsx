import axios from "../utils/config.util";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const register = (username, email, password) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
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
  return axios
    .get(API_URL + "user/detail")
    .then(({ data }) => data);
};

const updateProfile = (payload) => {
  return axios
    .post(API_URL + "user/update", payload)
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
  updateProfile
};
export default AuthService;
