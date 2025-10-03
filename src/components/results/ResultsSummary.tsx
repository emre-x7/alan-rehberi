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
      color: "blue",
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
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "emerald":
        return "bg-emerald-100 text-emerald-600";
      case "purple":
        return "bg-purple-100 text-purple-600";
      case "amber":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 rounded-2xl shadow-strong p-8 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
            >
              <div
                className={`w-12 h-12 ${getColorClasses(
                  stat.color
                )} rounded-2xl flex items-center justify-center mx-auto mb-3`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm text-blue-100 mb-1">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsSummary;
