import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  register,
  name,
  error,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className={`input-field ${
          error ? "border-error-500 focus:ring-error-500" : ""
        }`}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-2 text-sm text-error-600 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
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
