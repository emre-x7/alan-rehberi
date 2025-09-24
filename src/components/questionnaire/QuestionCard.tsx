import React from "react";
import { QuestionDto } from "../../types/questionnaire";
import LikertScale from "./LikertScale";

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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Soru {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-sm font-medium text-primary-600">
            %{Math.round(((currentIndex + 1) / totalQuestions) * 100)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
        {question.content}
      </h3>

      {/* Likert Scale */}
      <LikertScale
        questionId={question.id}
        selectedValue={selectedValue}
        onValueSelect={onAnswerSelect}
      />
    </div>
  );
};

export default QuestionCard;
