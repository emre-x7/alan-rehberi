import { api } from "./baseApi";
import { QuestionDto } from "../../types/question";

export const questionApi = {
  getQuestionsByDepartment: async (
    departmentId: number
  ): Promise<QuestionDto[]> => {
    const response = await api.get<QuestionDto[]>(
      `/api/questions/department/${departmentId}`
    );
    return response.data;
  },

  getQuestion: async (id: number): Promise<QuestionDto> => {
    const response = await api.get<QuestionDto>(`/api/questions/${id}`);
    return response.data;
  },
};
