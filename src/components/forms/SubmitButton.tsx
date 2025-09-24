import React from "react";

interface SubmitButtonProps {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "İşleniyor..." : text}
    </button>
  );
};

export default SubmitButton;
