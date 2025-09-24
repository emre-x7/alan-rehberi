import React from "react";
import { CareerResultDto } from "../../types/results";
import { TrendingUp, Target, Star, Award } from "lucide-react";

interface CareerResultCardProps {
  career: CareerResultDto;
  isTopResult?: boolean;
}

const CareerResultCard: React.FC<CareerResultCardProps> = ({
  career,
  isTopResult = false,
}) => {
  const getCompatibilityColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-100";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Award className="h-5 w-5 text-yellow-600" />;
    if (rank === 2) return <Award className="h-5 w-5 text-gray-600" />;
    if (rank === 3) return <Award className="h-5 w-5 text-orange-600" />;
    return <Target className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
        isTopResult ? "border-l-primary-500 border-l-4" : "border-l-gray-300"
      } hover:shadow-lg transition-shadow`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          {getRankIcon(career.rank)}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {career.careerName}
            </h3>
            <p className="text-sm text-gray-600">
              #{career.rank} Önerilen Kariyer
            </p>
          </div>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getCompatibilityColor(
            career.compatibilityPercentage
          )}`}
        >
          %{career.compatibilityPercentage.toFixed(1)} Uyum
        </div>
      </div>

      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        {career.careerDescription}
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center text-gray-600">
          <TrendingUp className="h-4 w-4 mr-2" />
          <span>
            Skor: {career.totalScore}/{career.maxPossibleScore}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Star className="h-4 w-4 mr-2" />
          <span>Sıra: {career.rank}</span>
        </div>
      </div>

      {isTopResult && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg">
          <p className="text-primary-700 text-sm font-medium">
            🎉 Bu kariyer en yüksek uyum skoruna sahip! Detaylı bilgi için
            tıklayın.
          </p>
        </div>
      )}
    </div>
  );
};

export default CareerResultCard;
