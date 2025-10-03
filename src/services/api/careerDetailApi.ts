import { api } from "./baseApi";
import { CareerDetailDto } from "../../types/careerDetail";
import { Download } from "lucide-react";

export const careerDetailApi = {
  getCareerDetail: async (careerId: number): Promise<CareerDetailDto> => {
    const response = await api.get<CareerDetailDto>(
      `/api/CareerDetails/${careerId}`
    );
    return response.data;
  },

  downloadCareerPdf: async (careerId: number): Promise<Blob> => {
    const response = await api.get(`/api/CareerDetails/${careerId}/pdf`, {
      responseType: "blob",
    });
    return response.data;
  },
};
