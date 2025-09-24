import { api } from "./baseApi";
import { DepartmentDto } from "../../types/department";

export const departmentApi = {
  getDepartments: async (): Promise<DepartmentDto[]> => {
    const response = await api.get<DepartmentDto[]>("/api/departments");
    return response.data;
  },

  getDepartment: async (id: number): Promise<DepartmentDto> => {
    const response = await api.get<DepartmentDto>(`/api/departments/${id}`);
    return response.data;
  },
};
