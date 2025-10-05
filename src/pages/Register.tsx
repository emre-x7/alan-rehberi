import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { registerUser } from "../store/auth/authSlice";
import { useRegisterForm } from "../hooks/useAuthForms";
import FormInput from "../components/forms/FormInput";
import SubmitButton from "../components/forms/SubmitButton";
import { RegisterFormData } from "../utils/validationSchemas";
import {
  GraduationCap,
  ArrowRight,
  UserPlus,
  Sparkles,
  BookOpen,
} from "lucide-react";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(result)) {
        navigate("/login");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 fade-in-up">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <UserPlus className="h-8 w-8 text-slate-900" />
              </div>
              <div className="absolute -top-1 -right-1">
                <div className="w-6 h-6 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Kendine En Uygun Alanı Keşfet
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sana en uygun kariyer yolunu keşfet — hemen ücretsiz katıl!
          </p>
        </div>

        <div className="card p-8">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-rose-50 dark:bg-rose-500/10 border-2 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 px-4 py-3 rounded-xl flex items-center">
                <svg
                  className="h-5 w-5 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center">
                  <span className="w-2 h-6 bg-sky-500 rounded-full mr-3"></span>
                  Kişisel Bilgiler
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Seni tanıyalım
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  label="Ad"
                  register={register}
                  name="firstName"
                  error={errors.firstName}
                  // placeholder="Adın"
                />
                <FormInput
                  label="Soyad"
                  register={register}
                  name="lastName"
                  error={errors.lastName}
                  // placeholder="Soyadın"
                />
              </div>

              <FormInput
                label="E-posta Adresi"
                type="email"
                register={register}
                name="email"
                error={errors.email}
                // placeholder="ornek@universite.edu.tr"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  label="Şifre"
                  type="password"
                  register={register}
                  name="password"
                  error={errors.password}
                  placeholder="En az 6 karakter"
                />
                <FormInput
                  label="Şifre Tekrar"
                  type="password"
                  register={register}
                  name="confirmPassword"
                  error={errors.confirmPassword}
                  placeholder="Şifreni tekrar gir"
                />
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center">
                  <span className="w-2 h-6 bg-emerald-500 rounded-full mr-3"></span>
                  Eğitim Bilgilerin
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Hangi bölümde okuyorsun?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  label="Üniversite"
                  register={register}
                  name="university"
                  error={errors.university}
                  // placeholder="Üniversite adı"
                />
                <FormInput
                  label="Bölüm"
                  register={register}
                  name="department"
                  error={errors.department}
                  // placeholder="Bölüm adı"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Sınıf
                </label>
                <select
                  {...register("academicYear", { valueAsNumber: true })}
                  className="input-field"
                >
                  <option value="">Sınıf seçin</option>
                  <option value={1}>1. Sınıf</option>
                  <option value={2}>2. Sınıf</option>
                  <option value={3}>3. Sınıf</option>
                  <option value={4}>4. Sınıf</option>
                </select>
                {errors.academicYear && (
                  <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                    {errors.academicYear.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Cinsiyet
                </label>

                <div className="space-y-3">
                  {[
                    { value: 1, label: "Erkek" },
                    { value: 2, label: "Kadın" },
                    { value: 3, label: "Belirtmek İstemiyorum" },
                  ].map((option) => (
                    <label key={option.value} className="radio-option">
                      <input
                        type="radio"
                        {...register("gender", { valueAsNumber: true })}
                        value={option.value}
                        className="radio-input"
                      />
                      <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>

                {errors.gender && (
                  <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <SubmitButton
                text="Hesabını Oluştur"
                isLoading={isLoading}
                className="btn-primary w-full"
              />
            </div>

            <div className="text-center pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Zaten hesabın var mı?
              </p>
              <Link
                to="/login"
                className="inline-flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold transition-all duration-300 group"
              >
                Giriş Yap
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
