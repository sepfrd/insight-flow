import apiClient from "./apiClients";

export const blogPostService = {
  submitBlogPostAsync: async ({ title, body }) => {
    const response = await apiClient.post("blog-posts", {
      title,
      body,
    });

    return response;
  },
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
  getUserBlogPostsAsync: async (filters) => {
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

    const response = await apiClient.get(`blog-posts/users/blog-posts${queryString}`);

    return response.data;
  },
  updateUserBlogPostAsync: async ({ blogPostUuid, newTitle, newBody }) => {
    const response = await apiClient.patch("blog-posts", {
      blogPostUuid,
      newTitle,
      newBody,
    });

    return response;
  },
  deleteUserBlogPostAsync: async ({ blogPostUuid }) => {
    const response = await apiClient.delete(`blog-posts/${blogPostUuid}`);

    return response;
  },
};

const isValid = (value) => value !== null && value !== undefined && value !== "";
