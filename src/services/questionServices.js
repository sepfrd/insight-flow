import { publicApiClient } from "../api/apiClients";

export const publicQuestionServices = {
  publicGetQuestionsAsync: async () => {
    const response = await publicApiClient.get("/questions");
    return response.data;
  },
};
