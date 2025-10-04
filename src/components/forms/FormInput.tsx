import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
  placeholder?: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  register,
  name,
  error,
  placeholder,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-slate-300">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="input-field"
      />
      {error && (
        <p className="text-sm text-rose-400 flex items-center">
          <svg
            className="h-4 w-4 mr-1 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
