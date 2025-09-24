import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { QuestionnaireResultDto } from "../../types/results";
import { resultsApi } from "../../services/api";

interface ProfileState {
  userResults: QuestionnaireResultDto[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  userResults: [],
  isLoading: false,
  error: null,
};

export const fetchUserProfileResults = createAsyncThunk(
  "profile/fetchUserResults",
  async (_, { rejectWithValue }) => {
    try {
      console.log("📊 Fetching user profile results...");
      const response = await resultsApi.getUserResults();
      console.log("✅ User results fetched:", response);
      return response;
    } catch (error: any) {
      console.error("❌ Error fetching user results:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Profil bilgileri yüklenirken hata oluştu"
      );
    }
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userResults = action.payload;
      })
      .addCase(fetchUserProfileResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
