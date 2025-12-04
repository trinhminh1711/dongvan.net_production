import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // API backend
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor request (gắn token nếu có)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
