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
    // Local state'i Redux answers ile senkronize et
    const answersMap: { [key: number]: number } = {};
    answers.forEach((answer) => {
      answersMap[answer.questionId] = answer.selectedValue;
    });
    setLocalAnswers(answersMap);
  }, [answers]);

  const initializeQuestionnaire = async (deptId: number) => {
    try {
      // Önce anketi başlat
      const result = await dispatch(
        startQuestionnaire({ departmentId: deptId })
      );
      if (startQuestionnaire.fulfilled.match(result)) {
        // Sonra soruları yükle
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
      // Cevapları kaydet
      await dispatch(
        submitAnswers({
          questionnaireId: currentQuestionnaireId,
          answers: answers,
        })
      ).unwrap();

      // Anketi tamamla
      await dispatch(completeQuestionnaire(currentQuestionnaireId)).unwrap();

      // Sonuçlar sayfasına yönlendir
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
            <Loader className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Anket hazırlanıyor...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center mb-4">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
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
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">Soru bulunamadı.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/departments")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Bölüm Seçimine Dön
          </button>

          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Kariyer Testi</h1>
            <span className="text-sm text-gray-600">
              {answeredQuestions}/{questions.length} soru cevaplandı
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          selectedValue={currentAnswer}
          onAnswerSelect={handleAnswerSelect}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Önceki Soru
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={answeredQuestions < questions.length || isSubmitting}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Testi Tamamla
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="flex items-center px-4 py-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sonraki Soru
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Questionnaire;
