import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser } from "../store/auth/authSlice";
import { useLoginForm } from "../hooks/useAuthForms";
import FormInput from "../components/forms/FormInput";
import SubmitButton from "../components/forms/SubmitButton";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <FormInput
            label="E-posta"
            type="email"
            register={register}
            name="email"
            error={errors.email}
            placeholder="ornek@email.com"
          />

          <FormInput
            label="Şifre"
            type="password"
            register={register}
            name="password"
            error={errors.password}
            placeholder="Şifrenizi giriniz"
          />

          <SubmitButton text="Giriş Yap" isLoading={isLoading} />

          <div className="text-center">
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-500"
            >
              Hesabınız yok mu? Kayıt olun
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
