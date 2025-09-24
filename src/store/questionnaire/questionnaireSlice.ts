// C:\Users\emreo\Desktop\CareerPathfinder\frontend\src\store\questionnaire\questionnaireSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { questionnaireApi, questionApi } from "../../services/api";
import {
  QuestionDto,
  AnswerDto,
  StartQuestionnaireRequest,
  SubmitAnswersRequest,
} from "../../types/questionnaire";

interface QuestionnaireState {
  currentQuestionnaireId: number | null;
  questions: QuestionDto[];
  currentQuestionIndex: number;
  answers: AnswerDto[];
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
}

const initialState: QuestionnaireState = {
  currentQuestionnaireId: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  isLoading: false,
  error: null,
  isSubmitting: false,
};

export const startQuestionnaire = createAsyncThunk(
  "questionnaire/start",
  async (data: StartQuestionnaireRequest, { rejectWithValue }) => {
    try {
      const questionnaireId = await questionnaireApi.startQuestionnaire(data);
      return questionnaireId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Anket başlatılırken hata oluştu"
      );
    }
  }
);

export const fetchQuestions = createAsyncThunk(
  "questionnaire/fetchQuestions",
  async (departmentId: number, { rejectWithValue }) => {
    try {
      const questions = await questionApi.getQuestionsByDepartment(
        departmentId
      );
      return questions;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Sorular yüklenirken hata oluştu"
      );
    }
  }
);

export const submitAnswers = createAsyncThunk(
  "questionnaire/submitAnswers",
  async (data: SubmitAnswersRequest, { rejectWithValue }) => {
    try {
      await questionnaireApi.submitAnswers(data);
      return data.answers;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Cevaplar kaydedilirken hata oluştu"
      );
    }
  }
);

export const completeQuestionnaire = createAsyncThunk(
  "questionnaire/complete",
  async (questionnaireId: number, { rejectWithValue }) => {
    try {
      await questionnaireApi.completeQuestionnaire(questionnaireId);
      return questionnaireId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Anket tamamlanırken hata oluştu"
      );
    }
  }
);

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<AnswerDto>) => {
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.questionId === action.payload.questionId
      );

      if (existingAnswerIndex >= 0) {
        state.answers[existingAnswerIndex] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    goToQuestion: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.questions.length) {
        state.currentQuestionIndex = action.payload;
      }
    },
    resetQuestionnaire: (state) => {
      state.currentQuestionnaireId = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // startQuestionnaire
      .addCase(startQuestionnaire.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startQuestionnaire.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentQuestionnaireId = action.payload;
        state.error = null;
      })
      .addCase(startQuestionnaire.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchQuestions
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
        state.currentQuestionIndex = 0;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // submitAnswers
      .addCase(submitAnswers.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitAnswers.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.answers = action.payload;
      })
      .addCase(submitAnswers.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setAnswer,
  nextQuestion,
  prevQuestion,
  goToQuestion,
  resetQuestionnaire,
  clearError,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
