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
    {
      value: 1,
      label: "Hiç Katılmıyorum",
      emoji: "😠",
      color: "rose",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/30",
      textColor: "text-rose-400",
    },
    {
      value: 2,
      label: "Katılmıyorum",
      emoji: "😕",
      color: "amber",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
    },
    {
      value: 3,
      label: "Kararsızım",
      emoji: "😐",
      color: "slate",
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-500/30",
      textColor: "text-slate-400",
    },
    {
      value: 4,
      label: "Katılıyorum",
      emoji: "🙂",
      color: "emerald",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
    },
    {
      value: 5,
      label: "Tamamen Katılıyorum",
      emoji: "😊",
      color: "green",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
    },
  ];

  const getColorClasses = (
    option: (typeof scaleOptions)[0],
    isSelected: boolean
  ) => {
    const baseClasses = "border-2 transition-all duration-300 transform ";

    if (isSelected) {
      return (
        baseClasses +
        `${option.borderColor} ${option.bgColor} ${option.textColor} shadow-lg scale-105`
      );
    }

    return (
      baseClasses +
      "border-slate-600 bg-slate-800 hover:border-slate-500 hover:bg-slate-700/50 hover:scale-102 text-slate-300"
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
              option,
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
            <span className="text-xl font-bold text-slate-200">
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
              option,
              selectedValue === option.value
            )}`}
          >
            <span className="text-3xl mb-3">{option.emoji}</span>
            <span className="text-xl font-bold mb-2 text-slate-200">
              {option.value}
            </span>
            <span className="text-xs font-semibold text-center leading-tight">
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
