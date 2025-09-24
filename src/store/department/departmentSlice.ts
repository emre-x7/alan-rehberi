import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { departmentApi } from "../../services/api/departmentApi";
import { DepartmentDto } from "../../types/department";

interface DepartmentState {
  departments: DepartmentDto[];
  selectedDepartment: DepartmentDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  departments: [],
  selectedDepartment: null,
  isLoading: false,
  error: null,
};

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await departmentApi.getDepartments();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Bölümler yüklenirken hata oluştu"
      );
    }
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
