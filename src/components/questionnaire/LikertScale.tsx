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
    { value: 1, label: "Hiç Katılmıyorum", emoji: "😠", color: "rose" },
    { value: 2, label: "Katılmıyorum", emoji: "😕", color: "amber" },
    { value: 3, label: "Kararsızım", emoji: "😐", color: "slate" },
    { value: 4, label: "Katılıyorum", emoji: "🙂", color: "emerald" },
    { value: 5, label: "Tamamen Katılıyorum", emoji: "😊", color: "green" },
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = "border-2 transition-all duration-300 transform ";

    if (isSelected) {
      switch (color) {
        case "rose":
          return (
            baseClasses +
            "border-rose-500 bg-rose-50 text-rose-700 shadow-lg scale-105"
          );
        case "amber":
          return (
            baseClasses +
            "border-amber-500 bg-amber-50 text-amber-700 shadow-lg scale-105"
          );
        case "slate":
          return (
            baseClasses +
            "border-slate-500 bg-slate-50 text-slate-700 shadow-lg scale-105"
          );
        case "emerald":
          return (
            baseClasses +
            "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg scale-105"
          );
        case "green":
          return (
            baseClasses +
            "border-green-500 bg-green-50 text-green-700 shadow-lg scale-105"
          );
        default:
          return (
            baseClasses +
            "border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105"
          );
      }
    }

    return (
      baseClasses +
      "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 hover:scale-102"
    );
  };

  return (
    <div className="space-y-4">
      {/* Mobile & Tablet - Stack vertically */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {scaleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onValueSelect(questionId, option.value)}
            className={`flex items-center justify-between p-4 rounded-xl ${getColorClasses(
              option.color,
              selectedValue === option.value
            )}`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{option.emoji}</span>
              <div className="text-left">
                <span className="font-semibold block text-sm">
                  {option.label}
                </span>
              </div>
            </div>
            <span className="text-xl font-bold text-slate-700">
              {option.value}
            </span>
          </button>
        ))}
      </div>

      {/* Desktop - Grid layout */}
      <div className="hidden md:grid md:grid-cols-5 gap-4">
        {scaleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onValueSelect(questionId, option.value)}
            className={`flex flex-col items-center justify-center p-6 rounded-xl ${getColorClasses(
              option.color,
              selectedValue === option.value
            )}`}
          >
            <span className="text-3xl mb-3">{option.emoji}</span>
            <span className="text-xl font-bold mb-2 text-slate-800">
              {option.value}
            </span>
            <span className="text-xs font-semibold text-center leading-tight text-slate-600">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* Scale Labels */}
      <div className="hidden md:flex justify-between pt-2 px-1 text-xs text-slate-500">
        <span>En düşük uyum</span>
        <span>En yüksek uyum</span>
      </div>
    </div>
  );
};

export default LikertScale;
