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

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion
    ? localAnswers[currentQuestion.id] || null
    : null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const answeredQuestions = Object.keys(localAnswers).length;
  const progressPercentage =
    questions.length > 0 ? (answeredQuestions / questions.length) * 100 : 0;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-blue-600" />
            </div>
            <p className="text-slate-700 font-medium">Test hazırlanıyor...</p>
            <p className="text-sm text-slate-500 mt-2">Sorular yükleniyor</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-6 px-6">
          <div className="bg-rose-50 border-2 border-rose-200 text-rose-700 px-6 py-4 rounded-xl flex items-center mb-6">
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
          <p className="text-slate-600">Soru bulunamadı.</p>
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
            onClick={() => navigate("/departments")}
            className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
          >
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Bölüm Seçimine Dön
          </button>

          {/* Progress Header */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-slate-200/60">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center">
                  <Target className="h-6 w-6 text-blue-600 mr-2" />
                  Kariyer Testi
                </h1>
                <p className="text-slate-600 text-sm mt-1">
                  Kendini en iyi ifade eden seçeneği işaretle
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    ~15 dakika
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-600">
                    {answeredQuestions}/{questions.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">İlerleme</span>
                <span className="font-semibold text-slate-900">
                  %{Math.round(progressPercentage)}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full transition-all duration-500 shadow-inner"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 text-center">
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
        <div className="fade-in">
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
            className="flex items-center px-6 py-3 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300 font-semibold border border-slate-200"
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
            <p className="text-sm text-slate-500">
              Soruları dürüst bir şekilde cevapla. Doğru ya da yanlış cevap yok!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Questionnaire;
