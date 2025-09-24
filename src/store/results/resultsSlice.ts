import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resultsApi } from "../../services/api";
import { QuestionnaireResultDto, CareerResultDto } from "../../types/results";
import { error } from "console";

interface ResultsState {
  questionnaireResults: QuestionnaireResultDto | null;
  userResults: QuestionnaireResultDto[];
  topCareers: CareerResultDto[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ResultsState = {
  questionnaireResults: null,
  userResults: [],
  topCareers: [],
  isLoading: false,
  error: null,
};

export const fetchQuestionnaireResults = createAsyncThunk(
  "results/fetchQuestionnaireResults",
  async (questionnaireId: number, { rejectWithValue }) => {
    try {
      console.log("Fetching results for questionnaire:", questionnaireId);
      const response = await resultsApi.getQuestionnaireResults(
        questionnaireId
      );
      console.log("Results fetched successfully:", response);
      return response;
    } catch (error: any) {
      console.error("Error fetching results:", error);
      if (error.response?.status === 404) {
        return rejectWithValue(
          "Bu test için henüz sonuç bulunamadı. Test tamamlanmamış olabilir."
        );
      }
      return rejectWithValue(
        error.response?.data?.message || "Sonuçlar yüklenirken hata oluştu"
      );
    }
  }
);

export const fetchUserResults = createAsyncThunk(
  "results/fetchUserResults",
  async (_, { rejectWithValue }) => {
    try {
      const response = await resultsApi.getUserResults();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Kullanıcı sonuçları yüklenirken hata oluştu"
      );
    }
  }
);

export const fetchTopCareers = createAsyncThunk(
  "results/fetchTopCareers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await resultsApi.getTopCareers();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Top kariyerler yüklenirken hata oluştu"
      );
    }
  }
);

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.questionnaireResults = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchQuestionnaireResults
      .addCase(fetchQuestionnaireResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuestionnaireResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questionnaireResults = action.payload;
      })
      .addCase(fetchQuestionnaireResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchUserResults
      .addCase(fetchUserResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userResults = action.payload;
      })
      .addCase(fetchUserResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchTopCareers
      .addCase(fetchTopCareers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopCareers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topCareers = action.payload;
      })
      .addCase(fetchTopCareers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearResults, clearError } = resultsSlice.actions;
export default resultsSlice.reducer;
