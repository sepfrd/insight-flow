import apiClient from "./apiClients";

export const authService = {
  loginAsync: async function (loginViewModel) {
    try {
      const response = await apiClient.post("/auth/login", loginViewModel);
      return response.data;
    } catch (exception) {
      return exception.response.data;
    }
  },
  signupAsync: async function (signupViewModel) {
    try {
      const response = await apiClient.post("/users", signupViewModel);
      return response.data;
    } catch (exception) {
      return exception.response.data;
    }
  },
};
