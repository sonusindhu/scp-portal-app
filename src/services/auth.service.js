import axios from "axios";

const API_URL = "https://apigwqa.ifreightsystems.com/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
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

  return axios.post(API_URL + "Account/Login", payload).then((response) => {
    const userData = response.data.data;
    if (userData.accessToken) {
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
