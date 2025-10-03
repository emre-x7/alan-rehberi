import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { careerDetailApi } from "../../services/api";
import { CareerDetailDto } from "../../types/careerDetail";

interface CareerDetailState {
  detail: CareerDetailDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CareerDetailState = {
  detail: null,
  isLoading: false,
  error: null,
};

export const fetchCareerDetail = createAsyncThunk(
  "careerDetail/fetchDetail",
  async (careerId: number, { rejectWithValue }) => {
    try {
      const response = await careerDetailApi.getCareerDetail(careerId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Kariyer detayı yüklenemedi"
      );
    }
  }
);

export const downloadCareerPdf = createAsyncThunk(
  "careerDetail/downloadPdf",
  async (careerId: number, { rejectWithValue }) => {
    try {
      const response = await careerDetailApi.downloadCareerPdf(careerId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "PDF indirilemedi"
      );
    }
  }
);

const careerDetailSlice = createSlice({
  name: "careerDetail",
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.detail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareerDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCareerDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detail = action.payload;
      })
      .addCase(fetchCareerDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(downloadCareerPdf.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearDetail } = careerDetailSlice.actions;
export default careerDetailSlice.reducer;
