// C:\Users\emreo\Desktop\CareerPathfinder\frontend\src\pages\Results.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchQuestionnaireResults,
  clearResults,
} from "../store/results/resultsSlice";
import CareerResultCard from "../components/results/CareerResultCard";
import ResultsSummary from "../components/results/ResultsSummary";
import Layout from "../components/layout/Layout";
import {
  Loader,
  AlertCircle,
  ArrowLeft,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react";

const Results: React.FC = () => {
  const { questionnaireId } = useParams<{ questionnaireId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { questionnaireResults, isLoading, error } = useAppSelector(
    (state) => state.results
  );
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (questionnaireId && questionnaireId !== "0") {
      const questionnaireIdNum = parseInt(questionnaireId);
      console.log("🔄 Loading results (ONCE)");
      loadResults(questionnaireIdNum);
    }

    return () => {
      dispatch(clearResults());
    };
  }, []); //

  const loadResults = async (id: number) => {
    try {
      console.log("Loading results for ID:", id);
      await dispatch(fetchQuestionnaireResults(id)).unwrap();
    } catch (error) {
      console.error("Failed to load results:", error);
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Sonuçlar yükleniyor...</p>
            <p className="text-sm text-gray-500 mt-2">
              Test ID: #{questionnaireId}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sonuçlar Yüklenemedi
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleRetry}
                className="btn-primary flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Tekrar Dene
              </button>
              <Link to="/departments" className="btn-secondary">
                Yeni Test Başlat
              </Link>
              <Link to="/profile" className="btn-secondary">
                Profile Dön
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // No results state
  if (!questionnaireResults) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sonuçlar Henüz Hazır Değil
            </h2>
            <p className="text-gray-600 mb-4">
              Test sonuçları henüz hesaplanıyor. Lütfen birkaç dakika sonra
              tekrar deneyin.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleRetry}
                className="btn-primary flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Tekrar Dene
              </button>
              <Link to="/profile" className="btn-secondary">
                Profile Dön
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Success state - Results found
  const topCareer = questionnaireResults.careerResults[0];
  const otherCareers = questionnaireResults.careerResults.slice(1);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link
              to="/profile"
              className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Profile Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Kariyer Testi Sonuçları
            </h1>
            <p className="text-gray-600 mt-2">
              Test ID: #{questionnaireResults.questionnaireId}
            </p>
          </div>

          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              PDF İndir
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Share2 className="h-4 w-4 mr-2" />
              Paylaş
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <ResultsSummary results={questionnaireResults} />

        {/* Results Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-primary-500 rounded-full mr-3"></span>
            Kariyer Önerileriniz ({
              questionnaireResults.careerResults.length
            }{" "}
            kariyer)
          </h2>

          {/* Top Result */}
          {topCareer && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🎉 En Yüksek Uyum
              </h3>
              <CareerResultCard career={topCareer} isTopResult={true} />
            </div>
          )}

          {/* Other Results */}
          {otherCareers.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Diğer Öneriler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherCareers.map((career) => (
                  <CareerResultCard key={career.careerId} career={career} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link to="/departments" className="btn-primary">
            Yeni Test Başlat
          </Link>
          <Link to="/profile" className="btn-secondary">
            Tüm Sonuçlarım
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
