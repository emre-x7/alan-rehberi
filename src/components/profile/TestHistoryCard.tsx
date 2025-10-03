import React from "react";
import { Link } from "react-router-dom";
import { QuestionnaireResultDto } from "../../types/results";
import { Calendar, Trophy, ArrowRight, Sparkles, Target } from "lucide-react";

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
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 hover:border-transparent hover:shadow-strong transition-all duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-start space-y-4 md:space-y-0">
        <div className="flex-1">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {result.departmentName} Testi
              </h3>
              <div className="flex flex-wrap gap-4 items-center text-sm text-slate-600 mt-2">
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
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              En İyi 3 Kariyer:
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.careerResults.slice(0, 3).map((career, index) => (
                <span
                  key={career.careerId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                >
                  <span className="w-4 h-4 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs mr-2">
                    {index + 1}
                  </span>
                  {career.careerName} (%
                  {career.compatibilityPercentage.toFixed(1)})
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
            {result.careerResults.length} kariyer
          </div>
          <Link
            to={
              result.questionnaireId > 0
                ? `/results/${result.questionnaireId}`
                : "#"
            }
            className={`inline-flex items-center font-semibold transition-all duration-300 ${
              result.questionnaireId > 0
                ? "text-blue-600 hover:text-blue-700 group-hover:translate-x-1"
                : "text-slate-400 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (result.questionnaireId <= 0) {
                e.preventDefault();
                alert("Bu test henüz tamamlanmamış veya sonuçlar hazır değil.");
              }
            }}
          >
            Detayları Gör
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestHistoryCard;
