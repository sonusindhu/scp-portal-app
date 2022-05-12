import axios from "axios";

const API_URL = "http://localhost:1337/api/v1/";

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

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
