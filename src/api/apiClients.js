import axios from "axios";
import { KEYS_VALUES } from "../utils/constants";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(KEYS_VALUES.authTokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
