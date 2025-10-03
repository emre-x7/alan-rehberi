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
  RefreshCw,
  PartyPopper,
  Trophy,
  Sparkles,
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
  }, []);

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
    if (questionnaireId) {
      loadResults(parseInt(questionnaireId));
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-blue-600" />
            </div>
            <p className="text-slate-700 font-medium">
              Sonuçlar hazırlanıyor...
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Kariyer önerilerini hesaplıyoruz
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-12 px-6">
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-strong p-8 border border-slate-200/60">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-2xl mb-4">
              <AlertCircle className="h-8 w-8 text-rose-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Sonuçlar Yüklenemedi
            </h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="btn-primary flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Tekrar Dene
              </button>
              <Link to="/departments" className="btn-secondary text-center">
                Yeni Test Başlat
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!questionnaireResults) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-12 px-6">
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-strong p-8 border border-slate-200/60">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Sonuçlar Henüz Hazır Değil
            </h2>
            <p className="text-slate-600 mb-6">
              Test sonuçların hesaplanıyor. Lütfen birkaç dakika sonra tekrar
              dene.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="btn-primary flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Tekrar Dene
              </button>
              <Link to="/profile" className="btn-secondary text-center">
                Profile Dön
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const topCareers = questionnaireResults.careerResults.slice(0, 3);
  const topCareer = topCareers[0];
  const otherCareers = topCareers.slice(1);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/profile"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Profile Dön
          </Link>

          {/* Celebration Header */}
          <div className="text-center mb-8 celebrate">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-strong mb-4">
              <PartyPopper className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Tebrikler! Test Tamamlandı 🎉
            </h1>
            <p className="text-lg text-slate-600">
              Sana en uygun kariyer yollarını bulduk
            </p>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-10">
          <ResultsSummary results={questionnaireResults} />
        </div>

        {/* Results Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-3"></span>
            En Yüksek Uyumlu 3 Kariyer Önerin
          </h2>

          {/* Top Result */}
          {topCareer && (
            <div className="mb-8 celebrate" style={{ animationDelay: "200ms" }}>
              <div className="relative">
                <div className="absolute -top-3 -left-3 z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-strong transform rotate-12">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                </div>
                <Link to={`/career/${topCareer.careerId}`} className="block">
                  <CareerResultCard career={topCareer} isTopResult={true} />
                </Link>
              </div>
            </div>
          )}

          {/* Other Results */}
          {otherCareers.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                Diğer Uyumlu Kariyerler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherCareers.map((career, index) => (
                  <Link
                    to={`/career/${career.careerId}`}
                    key={career.careerId}
                    className="block fade-in"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <CareerResultCard career={career} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 pt-8 border-t border-slate-200/60">
          <Link to="/profile" className="btn-secondary text-center">
            Tüm Sonuçlarım
          </Link>
          <Link to="/departments" className="btn-primary text-center">
            Yeni Test Başlat
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
