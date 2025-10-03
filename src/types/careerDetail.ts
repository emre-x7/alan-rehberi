export interface CareerDetailDto {
  id: number;
  careerId: number;
  careerName: string;
  summary: string;
  workAreas: string;
  averageSalary: string;
  beginnerResources: ResourceItem[];
  intermediateResources: ResourceItem[];
  advancedResources: ResourceItem[];
  projectIdeas: ProjectIdea[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceItem {
  title: string;
  url: string;
  type: string;
  description: string;
}

export interface ProjectIdea {
  title: string;
  description: string;
  difficulty: string;
  technologies: string[];
}
