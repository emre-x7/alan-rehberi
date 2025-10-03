import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const registerSchema = z
  .object({
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
    lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
    confirmPassword: z.string(),
    university: z.string().min(2, "Üniversite adı giriniz"),
    department: z.string().min(2, "Bölüm adı giriniz"),
    academicYear: z.number().min(1).max(4, "Sınıf 1-4 arasında olmalıdır"),
    gender: z.number().min(1).max(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
