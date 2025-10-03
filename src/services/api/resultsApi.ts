import { api } from "./baseApi";
import { QuestionnaireResultDto, CareerResultDto } from "../../types/results";

export const resultsApi = {
  getQuestionnaireResults: async (
    questionnaireId: number
  ): Promise<QuestionnaireResultDto> => {
    console.log("API Call: Getting results for questionnaire", questionnaireId);
    const response = await api.get<QuestionnaireResultDto>(
      `/api/results/questionnaire/${questionnaireId}`
    );
    console.log("API Response:", response.data);
    return response.data;
  },

  getUserResults: async (): Promise<QuestionnaireResultDto[]> => {
    const response = await api.get<QuestionnaireResultDto[]>(
      "/api/results/user"
    );
    return response.data;
  },

  getTopCareers: async (): Promise<CareerResultDto[]> => {
    const response = await api.get<CareerResultDto[]>(
      "/api/results/top-careers"
    );
    return response.data;
  },
};
