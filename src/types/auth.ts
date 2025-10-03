export enum Gender {
  Male = 1,
  Female = 2,
  PreferNotToSay = 3,
}

export interface RegisterRequest {
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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiration: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  department: string;
  academicYear: number;
  gender: Gender;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  department: string;
  academicYear: number;
  gender: Gender;
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}
