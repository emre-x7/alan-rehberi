export interface StartQuestionnaireRequest {
  departmentId: number;
}

export interface AnswerDto {
  questionId: number;
  selectedValue: number; // 1-5 arası Likert değeri
}

export interface SubmitAnswersRequest {
  questionnaireId: number;
  answers: AnswerDto[];
}

export interface Questionnaire {
  id: number;
  userId: string;
  departmentId: number;
  startedAt: string;
  completedAt?: string;
  status: "InProgress" | "Completed";
}

export interface QuestionDto {
  id: number;
  content: string;
  order: number;
}
