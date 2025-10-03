import React from "react";
import { Loader } from "lucide-react";

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
      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isLoading ? (
        <>
          <Loader className="h-5 w-5 mr-2 animate-spin" />
          İşleniyor...
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
