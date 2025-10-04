import React from "react";
import { CareerResultDto } from "../../types/results";
import {
  TrendingUp,
  Target,
  Star,
  Award,
  ChevronRight,
  Sparkles,
  Zap,
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
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (percentage >= 60)
      return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    return "text-amber-400 bg-amber-500/10 border-amber-500/20";
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1)
      return {
        icon: Award,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        label: "🏆 En İyi Eşleşme",
      };
    if (rank === 2)
      return {
        icon: Award,
        color: "text-slate-300",
        bg: "bg-slate-500/10",
        border: "border-slate-500/20",
        label: "🥈 İkinci",
      };
    if (rank === 3)
      return {
        icon: Award,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        label: "🥉 Üçüncü",
      };
    return {
      icon: Target,
      color: "text-slate-400",
      bg: "bg-slate-500/10",
      border: "border-slate-500/20",
      label: `#${rank}`,
    };
  };

  const badge = getRankBadge(career.rank);
  const BadgeIcon = badge.icon;

  return (
    <div
      className={`group card-interactive p-6 ${
        isTopResult
          ? "border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5 hover:border-amber-400/50"
          : `${badge.border} hover:border-slate-500`
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`p-2 ${badge.bg} rounded-xl border ${badge.border}`}>
            <BadgeIcon className={`h-6 w-6 ${badge.color}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-amber-400 transition-colors">
              {career.careerName}
            </h3>
            <p className="text-sm text-slate-400">{badge.label}</p>
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
      <p className="text-slate-400 mb-6 leading-relaxed line-clamp-3">
        {career.careerDescription}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sky-500/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-sky-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Skor</p>
            <p className="text-sm font-bold text-slate-100">
              {career.totalScore}/{career.maxPossibleScore}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
            <Zap className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Uyum</p>
            <p className="text-sm font-bold text-slate-100">
              %{career.compatibilityPercentage.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Top Result Banner */}
      {isTopResult && (
        <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border-2 border-amber-500/20 mb-4">
          <p className="text-amber-400 text-sm font-semibold flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
            🎯 En yüksek uyum skoruna sahip kariyer! Detaylı rehber için tıkla.
          </p>
        </div>
      )}

      {/* View Details Link */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          {career.totalScore} puan • {career.compatibilityPercentage.toFixed(1)}
          % uyum
        </span>
        <div className="flex items-center text-amber-400 font-semibold group-hover:text-amber-300 transition-colors">
          <span className="text-sm mr-1">Detayları Gör</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default CareerResultCard;
