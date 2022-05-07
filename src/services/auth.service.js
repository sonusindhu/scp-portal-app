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

  console.log(axios.defaults.headers);

  return axios.post(API_URL + "auth/login", payload).then((response) => {
    const userData = response.data.result;
    if (userData.token) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return userData;
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
