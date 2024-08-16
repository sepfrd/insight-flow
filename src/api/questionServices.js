import apiClient from "./apiClients";

export const publicQuestionServices = {
  publicGetQuestionsAsync: async () => {
    const response = await apiClient.get("questions");
    return response.data;
  },
};
