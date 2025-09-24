export interface CareerResultDto {
  careerId: number;
  careerName: string;
  careerDescription: string;
  totalScore: number;
  maxPossibleScore: number;
  compatibilityPercentage: number;
  rank: number;
}

export interface QuestionnaireResultDto {
  questionnaireId: number;
  departmentName: string;
  startedAt: string;
  completedAt?: string;
  careerResults: CareerResultDto[];
}
