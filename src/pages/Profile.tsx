import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUserProfileResults } from "../store/profile/profileSlice";
import TestHistoryCard from "../components/profile/TestHistoryCard";
import Layout from "../components/layout/Layout";
import {
  Loader,
  AlertCircle,
  User,
  Calendar,
  Award,
  BarChart3,
  Sparkles,
  TrendingUp,
  Book,
  Target,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { userResults, isLoading, error } = useAppSelector(
    (state) => state.profile
  );

  useEffect(() => {
    console.log("🔄 Fetching PROFILE results (ONCE)");
    dispatch(fetchUserProfileResults());
  }, [dispatch]);

  const totalTests = userResults.length;
  const averageCompatibility =
    userResults.length > 0
      ? userResults.reduce(
          (sum, result) =>
            sum + result.careerResults[0].compatibilityPercentage,
          0
        ) / userResults.length
      : 0;

  const mostTestedDepartment =
    userResults.length > 0
      ? userResults.reduce((acc, result) => {
          const dept = result.departmentName;
          acc[dept] = (acc[dept] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number })
      : {};

  const favoriteDepartment = Object.entries(mostTestedDepartment).sort(
    (a, b) => b[1] - a[1]
  )[0];

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-sky-500" />
            </div>
            <p className="text-slate-200 font-medium">Profil yükleniyor...</p>
            <p className="text-sm text-slate-400 mt-2">
              Verileriniz getiriliyor
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8 text-center fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl shadow-strong mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
            Merhaba, {user?.firstName}! 👋
          </h1>
          <p className="text-slate-400">Kariyer yolculuğundaki ilerlemen</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border-2 border-rose-500/20 text-rose-300 px-6 py-4 rounded-xl flex items-center mb-8">
            <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-semibold">Bir hata oluştu</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* User Info Card */}
        <div
          className="card p-8 mb-8 fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-100 mb-2">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-slate-400 mb-3">{user?.email}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-700/50 px-3 py-2 rounded-lg border border-slate-600">
                  <Book className="h-4 w-4" />
                  <span>{user?.department}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-700/50 px-3 py-2 rounded-lg border border-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Üyelik:{" "}
                    {new Date(user?.createdAt || "").toLocaleDateString(
                      "tr-TR"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className="card p-6 text-center hover:shadow-strong transition-all duration-300 fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-7 w-7 text-sky-400" />
            </div>
            <h3 className="text-3xl font-bold text-slate-100 mb-1">
              {totalTests}
            </h3>
            <p className="text-slate-400 font-medium">Toplam Test</p>
          </div>

          <div
            className="card p-6 text-center hover:shadow-strong transition-all duration-300 fade-in-up"
            style={{ animationDelay: "250ms" }}
          >
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-bold text-slate-100 mb-1">
              %{averageCompatibility.toFixed(1)}
            </h3>
            <p className="text-slate-400 font-medium">Ortalama Uyum</p>
          </div>

          <div
            className="card p-6 text-center hover:shadow-strong transition-all duration-300 fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-7 w-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-1 truncate">
              {favoriteDepartment ? favoriteDepartment[0] : "Yok"}
            </h3>
            <p className="text-slate-400 font-medium">En Çok Test Edilen</p>
          </div>
        </div>

        {/* Last Test Result Banner */}
        {userResults.length > 0 && (
          <div
            className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-2xl p-6 mb-8 text-slate-100 shadow-strong border border-sky-500/20 relative overflow-hidden fade-in-up"
            style={{ animationDelay: "350ms" }}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-sky-400" />
                    Son Test Sonucun
                  </h3>
                  <p className="text-slate-300">
                    <strong>{userResults[0].departmentName}</strong> testinden{" "}
                    <strong className="text-sky-400">
                      %
                      {userResults[0].careerResults[0].compatibilityPercentage.toFixed(
                        1
                      )}
                    </strong>{" "}
                    uyum aldın
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    {new Date(
                      userResults[0].completedAt || userResults[0].startedAt
                    ).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <Link
                  to={`/results/${userResults[0].questionnaireId}`}
                  className="btn-primary whitespace-nowrap"
                >
                  Sonuçları Gör
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Test History Section */}
        <div className="mb-8 fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full mr-3"></span>
              Test Geçmişi
            </h2>
            <span className="inline-flex items-center px-3 py-1 bg-sky-500/10 text-sky-400 text-sm font-semibold rounded-full border border-sky-500/20">
              {totalTests} test
            </span>
          </div>

          {userResults.length === 0 ? (
            <div className="text-center card py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-700 rounded-2xl mb-4">
                <BarChart3 className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">
                Henüz Test Geçmişin Yok
              </h3>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                İlk testini tamamlayarak kariyer yolculuğuna başla ve sana özel
                önerileri keşfet!
              </p>
              <Link
                to="/departments"
                className="btn-primary inline-flex items-center"
              >
                İlk Testi Başlat
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {userResults.map((result, index) => (
                <div
                  key={result.questionnaireId}
                  className="fade-in-up"
                  style={{ animationDelay: `${(index + 5) * 100}ms` }}
                >
                  <TestHistoryCard result={result} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
