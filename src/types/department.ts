export interface Department {
  id: number;
  name: string;
  description?: string;
  questionCount: number;
  careerCount: number;
}

export interface DepartmentDto {
  id: number;
  name: string;
  description?: string;
  questionCount: number;
  careerCount: number;
}
