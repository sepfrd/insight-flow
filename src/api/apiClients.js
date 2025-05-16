import axios from "axios";
import { toastService } from "@/utils/toastService";
import { storageService } from "./storageService";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://sepfrd.com/insight-flow/api",
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
