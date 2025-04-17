import axios from "axios";
import { storageService } from "./storageService";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = storageService.getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
