import apiClient from "./apiClients";

export const blogPostServices = {
  getBlogPostsAsync: async (filters) => {
    const { pageNumber, pageSize } = filters;

    const queryParams = [];

    if (pageNumber < 1 || pageSize < 1 || pageSize > 100) {
      return null;
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (isValid(value)) {
        queryParams.push(`${key}=${encodeURIComponent(value)}`);
      }
    });

    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    const response = await apiClient.get(`blog-posts/${queryString}`);

    return response.data;
  },
};

const isValid = (value) => value !== null && value !== undefined && value !== "";
