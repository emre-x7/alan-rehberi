import React from "react";
import { QuestionDto } from "../../types/questionnaire";
import LikertScale from "./LikertScale";
import { MessageCircle, Target } from "lucide-react";

interface QuestionCardProps {
  question: QuestionDto;
  selectedValue: number | null;
  onAnswerSelect: (questionId: number, value: number) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedValue,
  onAnswerSelect,
  currentIndex,
  totalQuestions,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-8 border border-slate-200/60">
      {/* Question Number Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-xl border border-blue-200">
          <MessageCircle className="h-4 w-4 text-blue-600 mr-2" />
          <span className="text-sm font-semibold text-blue-700">
            Soru {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            %{Math.round(((currentIndex + 1) / totalQuestions) * 100)}
          </div>
          <div className="text-xs text-slate-500">tamamlandı</div>
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-8 leading-relaxed text-center">
        "{question.content}"
      </h3>

      {/* Likert Scale */}
      <LikertScale
        questionId={question.id}
        selectedValue={selectedValue}
        onValueSelect={onAnswerSelect}
      />

      {/* Helper Text */}
      {!selectedValue && (
        <div className="text-center mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-700 flex items-center justify-center">
            <Target className="h-4 w-4 mr-2" />
            Yukarıdaki seçeneklerden birini seçerek devam et
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
