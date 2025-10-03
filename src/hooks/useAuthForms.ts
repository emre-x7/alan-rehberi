import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  registerSchema,
  LoginFormData,
  RegisterFormData,
} from "../utils/validationSchemas";
import { Gender } from "../types/auth";
import React from "react";

export const useLoginForm = () => {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};

export const useRegisterForm = () => {
  const form = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      university: "",
      department: "",
      academicYear: 1,
      gender: 1,
    },
  });

  return form;
};
