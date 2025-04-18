import apiClient from "./apiClients";

export const userService = {
  getUserProfileImageAsync: async (token) => {
    const config = {
      responseType: "blob",
      headers: {},
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await apiClient.get("users/profile-image", config);
      return response.data;
    } catch {
      return null;
    }
  },
  getUserInformationAsync: async (token) => {
    const config = { headers: {} };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await apiClient.get("users/information", config);

    return response.data;
  },
  uploadUserProfileImageAsync: async (imageFile) => {
    const formData = new FormData();

    formData.append("imageFile", imageFile);

    const response = await apiClient.put("users/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
