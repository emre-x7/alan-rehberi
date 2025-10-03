import React from "react";
import { CareerResultDto } from "../../types/results";
import {
  TrendingUp,
  Target,
  Star,
  Award,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface CareerResultCardProps {
  career: CareerResultDto;
  isTopResult?: boolean;
}

const CareerResultCard: React.FC<CareerResultCardProps> = ({
  career,
  isTopResult = false,
}) => {
  const getCompatibilityColor = (percentage: number) => {
    if (percentage >= 80)
      return "text-emerald-600 bg-emerald-100 border-emerald-200";
    if (percentage >= 60) return "text-cyan-600 bg-cyan-100 border-cyan-200";
    return "text-amber-600 bg-amber-100 border-amber-200";
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1)
      return {
        icon: Award,
        color: "text-amber-500",
        bg: "bg-amber-50",
        border: "border-amber-200",
      };
    if (rank === 2)
      return {
        icon: Award,
        color: "text-slate-500",
        bg: "bg-slate-50",
        border: "border-slate-200",
      };
    if (rank === 3)
      return {
        icon: Award,
        color: "text-orange-500",
        bg: "bg-orange-50",
        border: "border-orange-200",
      };
    return {
      icon: Target,
      color: "text-slate-400",
      bg: "bg-slate-50",
      border: "border-slate-200",
    };
  };

  const badge = getRankBadge(career.rank);
  const BadgeIcon = badge.icon;

  return (
    <div
      className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-500 hover:shadow-strong ${
        isTopResult
          ? "border-blue-300 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 hover:border-blue-400"
          : `${badge.border} hover:border-slate-300`
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`p-2 ${badge.bg} rounded-xl border ${badge.border}`}>
            <BadgeIcon className={`h-6 w-6 ${badge.color}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
              {career.careerName}
            </h3>
            <p className="text-sm text-slate-600">
              #{career.rank} Önerilen Kariyer
            </p>
          </div>
        </div>

        <div
          className={`px-4 py-2 rounded-xl text-sm font-bold border ${getCompatibilityColor(
            career.compatibilityPercentage
          )}`}
        >
          %{career.compatibilityPercentage.toFixed(1)}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-700 mb-6 leading-relaxed line-clamp-3">
        {career.careerDescription}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-xl border border-slate-200/60">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Skor</p>
            <p className="text-sm font-bold text-slate-900">
              {career.totalScore}/{career.maxPossibleScore}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <Star className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Sıralama</p>
            <p className="text-sm font-bold text-slate-900">#{career.rank}</p>
          </div>
        </div>
      </div>

      {/* Top Result Banner */}
      {isTopResult && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 mb-4">
          <p className="text-blue-700 text-sm font-semibold flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
            🏆 En yüksek uyum skoruna sahip kariyer! Detaylı rehber için tıkla.
          </p>
        </div>
      )}

      {/* View Details Link */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          {career.totalScore} puan • {career.compatibilityPercentage.toFixed(1)}
          % uyum
        </span>
        <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
          <span className="text-sm mr-1">Detayları Gör</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default CareerResultCard;
