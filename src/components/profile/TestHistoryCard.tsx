import React from "react";
import { Link } from "react-router-dom";
import { QuestionnaireResultDto } from "../../types/results";
import { Calendar, Clock, Book, ArrowRight, Trophy } from "lucide-react";

interface TestHistoryCardProps {
  result: QuestionnaireResultDto;
}

const TestHistoryCard: React.FC<TestHistoryCardProps> = ({ result }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const topCareer = result.careerResults[0];

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {result.departmentName} Testi
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(result.completedAt || result.startedAt)}
            </div>
            <div className="flex items-center">
              <Trophy className="h-4 w-4 mr-1" />
              En Yüksek: %{topCareer.compatibilityPercentage.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
          {result.careerResults.length} Kariyer
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          En İyi 3 Kariyer:
        </h4>
        <div className="flex flex-wrap gap-2">
          {result.careerResults.slice(0, 3).map((career, index) => (
            <span
              key={career.careerId}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
            >
              {index + 1}. {career.careerName} (%
              {career.compatibilityPercentage.toFixed(1)})
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {result.questionnaireId > 0
            ? `Test ID: #${result.questionnaireId}`
            : "Test tamamlanıyor..."}
        </span>
        <Link
          to={
            result.questionnaireId > 0
              ? `/results/${result.questionnaireId}`
              : "#"
          }
          className={`flex items-center font-medium ${
            result.questionnaireId > 0
              ? "text-primary-600 hover:text-primary-700"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={(e) => {
            if (result.questionnaireId <= 0) {
              e.preventDefault();
              alert("Bu test henüz tamamlanmamış veya sonuçlar hazır değil.");
            }
          }}
        >
          Sonuçları Görüntüle
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default TestHistoryCard;
