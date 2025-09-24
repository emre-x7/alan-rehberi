import React from "react";
import { QuestionnaireResultDto } from "../../types/results";
import { Calendar, Clock, Book, Trophy } from "lucide-react";

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

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center">
          <Book className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm opacity-90">Bölüm</p>
          <p className="text-lg font-semibold">{results.departmentName}</p>
        </div>

        <div className="text-center">
          <Calendar className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm opacity-90">Test Tarihi</p>
          <p className="text-lg font-semibold">
            {formatDate(results.startedAt)}
          </p>
        </div>

        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm opacity-90">Süre</p>
          <p className="text-lg font-semibold">
            {formatDuration(results.startedAt, results.completedAt)}
          </p>
        </div>

        <div className="text-center">
          <Trophy className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm opacity-90">En Yüksek Uyum</p>
          <p className="text-lg font-semibold">
            %{topCareer.compatibilityPercentage.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
