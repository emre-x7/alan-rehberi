import { Gender, User } from "../../types/auth";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  university: string;
  department: string;
  academicYear: number;
  gender: Gender;
}
