// src/pages/Login.tsx - YENİ DARK MODE
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../store/auth/authSlice";
import { useLoginForm } from "../hooks/useAuthForms";
import FormInput from "../components/forms/FormInput";
import SubmitButton from "../components/forms/SubmitButton";
import { GraduationCap, ArrowRight, Sparkles, Lock } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const onSubmit = async (data: any) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 fade-in-up">
        {/* Logo ve Başlık */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-3">
            Tekrar Hoş Geldin!
          </h1>
          <p className="text-slate-400">
            Kariyer yolculuğuna kaldığın yerden devam et
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-rose-500/10 border-2 border-rose-500/20 text-rose-300 px-4 py-3 rounded-xl flex items-center">
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

            <div className="space-y-5">
              <FormInput
                label="E-posta Adresi"
                type="email"
                register={register}
                name="email"
                error={errors.email}
                placeholder="ornek@universite.edu.tr"
              />

              <FormInput
                label="Şifre"
                type="password"
                register={register}
                name="password"
                error={errors.password}
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <SubmitButton
                text="Giriş Yap"
                isLoading={isLoading}
                className="btn-primary w-full"
              />
            </div>

            <div className="text-center pt-4 border-t border-slate-700/60">
              <p className="text-sm text-slate-400 mb-3">
                Henüz hesabın yok mu?
              </p>
              <Link
                to="/register"
                className="inline-flex items-center text-amber-400 hover:text-amber-300 font-semibold transition-all duration-300 group"
              >
                Hemen Kayıt Ol
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </form>
        </div>

        {/* Alt Bilgi */}
        <p className="text-center text-xs text-slate-500">
          Güvenli ve şifreli bağlantı ile korunuyorsun
        </p>
      </div>
    </div>
  );
};

export default Login;
