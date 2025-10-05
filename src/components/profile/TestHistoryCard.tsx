import React from "react";
import { Link } from "react-router-dom";
import { QuestionnaireResultDto } from "../../types/results";
import {
  Calendar,
  Trophy,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

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
    <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-500 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
      <div className="flex flex-col md:flex-row justify-between md:items-start space-y-4 md:space-y-0">
        <div className="flex-1">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {result.departmentName} Testi
              </h3>
              <div className="flex flex-wrap gap-4 items-center text-sm text-slate-600 dark:text-slate-400 mt-2">
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
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              En Uygun 3 Alan:
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.careerResults.slice(0, 3).map((career, index) => (
                <span
                  key={career.careerId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600"
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-xs mr-2 ${
                      index === 0
                        ? "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"
                        : index === 1
                        ? "bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
                        : "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400"
                    }`}
                  >
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
          <div className="inline-flex items-center px-3 py-1 bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 text-sm font-semibold rounded-full border border-sky-200 dark:border-sky-500/20">
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
                ? "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 group-hover:translate-x-1"
                : "text-slate-400 cursor-not-allowed"
            }`}
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
