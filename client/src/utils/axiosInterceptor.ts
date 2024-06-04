import axios from "axios";

const API_URL = "https://example.com/api/";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const api = axios.create({
  baseURL: API_URL,
});

export default api;
