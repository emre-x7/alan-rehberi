import { api } from "./baseApi";
import {
  StartQuestionnaireRequest,
  SubmitAnswersRequest,
} from "../../types/questionnaire";

export const questionnaireApi = {
  startQuestionnaire: async (
    data: StartQuestionnaireRequest
  ): Promise<number> => {
    const response = await api.post<number>("/api/questionnaire/start", data);
    return response.data;
  },

  submitAnswers: async (data: SubmitAnswersRequest): Promise<void> => {
    await api.post("/api/questionnaire/submit-answers", data);
  },

  completeQuestionnaire: async (questionnaireId: number): Promise<void> => {
    await api.post(`/api/questionnaire/complete/${questionnaireId}`);
  },
};
