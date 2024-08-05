import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:9000/api",
});

export const publicApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:9000/api/public",
});
