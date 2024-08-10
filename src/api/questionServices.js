import apiClient from "./apiClients";

export const publicQuestionServices = {
  publicGetQuestionsAsync: async () => {
    const response = await apiClient.get("public/questions");
    return response.data;
  },
};
