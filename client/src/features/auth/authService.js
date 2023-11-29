import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// User Register
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

// Login User

const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const authService = {
  register,
  logout,
  login,
};
export default authService;
