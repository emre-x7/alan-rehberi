import React from "react";
import { QuestionnaireResultDto } from "../../types/results";
import { Calendar, Clock, Book, Trophy, Target } from "lucide-react";

interface ResultsSummaryProps {
  results: QuestionnaireResultDto;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDuration = (startedAt: string, completedAt?: string) => {
    const start = new Date(startedAt);
    const end = completedAt ? new Date(completedAt) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins} dakika`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours} saat ${mins} dakika`;
  };

  const topCareer = results.careerResults[0];

  const stats = [
    {
      icon: Book,
      label: "Bölüm",
      value: results.departmentName,
      color: "sky",
    },
    {
      icon: Calendar,
      label: "Test Tarihi",
      value: formatDate(results.startedAt),
      color: "emerald",
    },
    {
      icon: Clock,
      label: "Süre",
      value: formatDuration(results.startedAt, results.completedAt),
      color: "purple",
    },
    {
      icon: Trophy,
      label: "En Yüksek Uyum",
      value: `%${topCareer.compatibilityPercentage.toFixed(1)}`,
      color: "amber",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "sky":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "emerald":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "purple":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "amber":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-strong p-8 text-slate-100 border border-slate-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`text-center p-4 rounded-xl backdrop-blur-sm border ${getColorClasses(
                stat.color
              )}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${getColorClasses(
                  stat.color
                )}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-slate-100">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsSummary;
