import axios from "axios";
import { storageService } from "./storageService";
import { toastService } from "../utils/toastService";

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

apiClient.interceptors.response.use(
  (response) => {
    const message = response?.data?.message;

    message && toastService.success(message);

    return response;
  },
  (error) => {
    const message = error?.response?.data?.message;

    message && toastService.error(message);

    return Promise.reject(error);
  }
);

export default apiClient;
