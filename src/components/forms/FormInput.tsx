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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className={`input-field ${error ? "border-red-500" : ""}`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormInput;
