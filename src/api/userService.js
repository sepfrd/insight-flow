import apiClient from "./apiClients";

export const userService = {
  getUserProfileImageAsync: async () => {
    const response = await apiClient.get("users/profile-image", { responseType: "blob" });
    return response.data;
  },
  uploadUserProfileImageAsync: async (imageFile) => {
    const formData = new FormData();

    formData.append("imageFile", imageFile);

    const response = await apiClient.put("users/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(response.data);

    return response.data;
  },
};
