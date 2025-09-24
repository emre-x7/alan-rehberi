import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import departmentReducer from "./department/departmentSlice";
import questionnaireReducer from "./questionnaire/questionnaireSlice";
import resultsReducer from "./results/resultsSlice";
import profileReducer from "./profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    departments: departmentReducer,
    questionnaire: questionnaireReducer,
    results: resultsReducer,
    profile: profileReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
