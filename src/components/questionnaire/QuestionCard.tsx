import React from "react";
import { QuestionDto } from "../../types/questionnaire";
import LikertScale from "./LikertScale";
import { MessageCircle, Target, HelpCircle } from "lucide-react";

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
    <div className="card p-8">
      {/* Question Number Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center px-4 py-2 bg-sky-500/10 rounded-xl border border-sky-500/20">
          <MessageCircle className="h-4 w-4 text-sky-400 mr-2" />
          <span className="text-sm font-semibold text-sky-400">
            Soru {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-sky-400">
            %{Math.round(((currentIndex + 1) / totalQuestions) * 100)}
          </div>
          <div className="text-xs text-slate-500">tamamlandı</div>
        </div>
      </div>

      {/* Question Text */}
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-slate-100 mb-8 leading-relaxed">
          "{question.content}"
        </h3>

        {/* Helper Info */}
        <div className="inline-flex items-center px-4 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
          <HelpCircle className="h-4 w-4 text-slate-400 mr-2" />
          <span className="text-sm text-slate-400">
            Kendini en iyi ifade eden seçeneği işaretle
          </span>
        </div>
      </div>

      {/* Likert Scale */}
      <LikertScale
        questionId={question.id}
        selectedValue={selectedValue}
        onValueSelect={onAnswerSelect}
      />

      {/* Helper Text */}
      {!selectedValue && (
        <div className="text-center mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
          <p className="text-sm text-amber-400 flex items-center justify-center">
            <Target className="h-4 w-4 mr-2" />
            Yukarıdaki seçeneklerden birini seçerek devam et
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
