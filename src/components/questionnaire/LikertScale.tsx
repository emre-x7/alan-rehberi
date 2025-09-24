import React from "react";

interface LikertScaleProps {
  questionId: number;
  selectedValue: number | null;
  onValueSelect: (questionId: number, value: number) => void;
}

const LikertScale: React.FC<LikertScaleProps> = ({
  questionId,
  selectedValue,
  onValueSelect,
}) => {
  const scaleOptions = [
    { value: 1, label: "Hiç Katılmıyorum", emoji: "😠" },
    { value: 2, label: "Katılmıyorum", emoji: "😕" },
    { value: 3, label: "Kararsızım", emoji: "😐" },
    { value: 4, label: "Katılıyorum", emoji: "🙂" },
    { value: 5, label: "Tamamen Katılıyorum", emoji: "😊" },
  ];

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {scaleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onValueSelect(questionId, option.value)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
              selectedValue === option.value
                ? "border-primary-500 bg-primary-50 text-primary-700"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="text-2xl mb-2">{option.emoji}</span>
            <span className="text-sm font-medium">{option.value}</span>
            <span className="text-xs text-gray-600 mt-1 text-center">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LikertScale;
