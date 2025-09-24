export interface Question {
  id: number;
  content: string;
  order: number;
  isActive: boolean;
  departmentId: number;
}

export interface QuestionDto {
  id: number;
  content: string;
  order: number;
}
