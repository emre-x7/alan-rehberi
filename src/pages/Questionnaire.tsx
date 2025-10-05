import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  startQuestionnaire,
  fetchQuestions,
  setAnswer,
  nextQuestion,
  prevQuestion,
  submitAnswers,
  completeQuestionnaire,
  resetQuestionnaire,
} from "../store/questionnaire/questionnaireSlice";
import QuestionCard from "../components/questionnaire/QuestionCard";
import Layout from "../components/layout/Layout";
import ConfirmationModal from "../components/forms/ConfirmationModal";
import {
  Loader,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Sparkles,
  Target,
  Clock,
} from "lucide-react";

const Questionnaire: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    currentQuestionnaireId,
    questions,
    currentQuestionIndex,
    answers,
    isLoading,
    error,
    isSubmitting,
  } = useAppSelector((state) => state.questionnaire);

  const [localAnswers, setLocalAnswers] = useState<{ [key: number]: number }>(
    {}
  );
  const [showBackConfirmation, setShowBackConfirmation] = useState(false);

  useEffect(() => {
    if (departmentId) {
      const departmentIdNum = parseInt(departmentId);
      console.log("🔄 Initializing questionnaire (ONCE)");
      initializeQuestionnaire(departmentIdNum);
    }
  }, []);

  useEffect(() => {
    const answersMap: { [key: number]: number } = {};
    answers.forEach((answer) => {
      answersMap[answer.questionId] = answer.selectedValue;
    });
    setLocalAnswers(answersMap);
  }, [answers]);

  const initializeQuestionnaire = async (deptId: number) => {
    try {
      const result = await dispatch(
        startQuestionnaire({ departmentId: deptId })
      );
      if (startQuestionnaire.fulfilled.match(result)) {
        await dispatch(fetchQuestions(deptId));
      }
    } catch (error) {
      console.error("Anket başlatma hatası:", error);
    }
  };

  const handleAnswerSelect = (questionId: number, value: number) => {
    dispatch(setAnswer({ questionId, selectedValue: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      dispatch(prevQuestion());
    }
  };

  const handleSubmit = async () => {
    if (!currentQuestionnaireId) return;

    try {
      await dispatch(
        submitAnswers({
          questionnaireId: currentQuestionnaireId,
          answers: answers,
        })
      ).unwrap();

      await dispatch(completeQuestionnaire(currentQuestionnaireId)).unwrap();

      navigate(`/results/${currentQuestionnaireId}`);
    } catch (error) {
      console.error("Anket gönderme hatası:", error);
    }
  };

  const handleBackClick = () => {
    setShowBackConfirmation(true);
  };

  const handleBackConfirm = () => {
    setShowBackConfirmation(false);
    navigate("/departments");
  };

  const handleBackCancel = () => {
    setShowBackConfirmation(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion
    ? localAnswers[currentQuestion.id] || null
    : null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const answeredQuestions = Object.keys(localAnswers).length;
  const progressPercentage =
    questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-sky-600 dark:text-sky-500" />
            </div>
            <p className="text-slate-800 dark:text-slate-200 font-medium">
              Test hazırlanıyor...
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Sorular yükleniyor
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-6 px-6">
          <div className="bg-rose-50 dark:bg-rose-500/10 border-2 border-rose-200 dark:border-rose-500/20 text-rose-800 dark:text-rose-300 px-6 py-4 rounded-xl flex items-center mb-6">
            <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-semibold">Bir hata oluştu</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/departments")}
            className="btn-primary"
          >
            Bölüm Seçimine Dön
          </button>
        </div>
      </Layout>
    );
  }

  if (!currentQuestion) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-6 px-6">
          <p className="text-slate-700 dark:text-slate-400">Soru bulunamadı.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 mb-6 transition-colors group"
          >
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Bölüm Seçimine Dön
          </button>

          {/* Progress Header */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
                  <Target className="h-6 w-6 text-sky-600 dark:text-sky-400 mr-2" />
                  Uyum Analizi Testi
                </h1>
                <p className="text-slate-700 dark:text-slate-400 text-sm mt-1">
                  Seni en iyi ifade eden seçeneği işaretle
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-sky-100 dark:bg-sky-500/10 px-3 py-2 rounded-lg border border-sky-200 dark:border-sky-500/20">
                  <Clock className="h-4 w-4 text-sky-700 dark:text-sky-400" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    ~15 dakika
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {currentQuestionIndex + 1}/{questions.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700 dark:text-slate-400">
                  İlerleme
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  %{Math.round(progressPercentage)}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-500 text-center">
                {progressPercentage === 100
                  ? "🎉 Harika! Tüm soruları cevapladın"
                  : progressPercentage >= 50
                  ? "🚀 Yarıladın! Devam et"
                  : "💪 İyi gidiyorsun!"}
              </p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="fade-in-up">
          <QuestionCard
            question={currentQuestion}
            selectedValue={currentAnswer}
            onAnswerSelect={handleAnswerSelect}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-6 py-3 text-slate-700 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-300 font-semibold border border-slate-300 dark:border-slate-600"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Önceki
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={answeredQuestions < questions.length || isSubmitting}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Testi Tamamla
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="flex items-center btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sonraki
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          )}
        </div>

        {/* Helper Text */}
        {answeredQuestions < questions.length && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-700 dark:text-slate-400">
              Seni en iyi ifade eden seçeneği işaretle. Doğru ya da yanlış cevap
              yok!
            </p>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showBackConfirmation}
        onClose={handleBackCancel}
        onConfirm={handleBackConfirm}
        title="Bölüm seçimine dönmek istediğinizden emin misiniz?"
        message="Test ilerlemeniz kaybolacak ve baştan başlamaniz gerekecek."
        confirmText="Evet"
        cancelText="Hayır"
      />
    </Layout>
  );
};

export default Questionnaire;
