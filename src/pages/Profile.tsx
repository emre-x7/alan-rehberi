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
            <Loader className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Profil bilgileri yükleniyor...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profilim</h1>
          <p className="text-gray-600 mt-2">
            Hesap bilgileriniz ve test geçmişiniz
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center mb-6">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {/* User Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Üyelik Tarihi:{" "}
                {new Date(user?.createdAt || "").toLocaleDateString("tr-TR")}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {totalTests}
            </h3>
            <p className="text-gray-600">Toplam Test</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              %{averageCompatibility.toFixed(1)}
            </h3>
            <p className="text-gray-600">Ortalama Uyum</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {favoriteDepartment ? favoriteDepartment[0] : "Yok"}
            </h3>
            <p className="text-gray-600">En Çok Test Edilen</p>
          </div>
        </div>

        {/* 🔥 Son Test Sonucunuz Section */}
        {userResults.length > 0 && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">
              📊 Son Test Sonucunuz
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-primary-700">
                  <strong>{userResults[0].departmentName}</strong> testinden{" "}
                  <strong>
                    %
                    {userResults[0].careerResults[0].compatibilityPercentage.toFixed(
                      1
                    )}
                  </strong>{" "}
                  uyum aldınız
                </p>
                <p className="text-primary-600 text-sm">
                  {new Date(
                    userResults[0].completedAt || userResults[0].startedAt
                  ).toLocaleDateString("tr-TR")}
                </p>
              </div>
              <Link
                to={`/results/${userResults[0].questionnaireId}`}
                className="btn-primary"
              >
                Sonucu Görüntüle
              </Link>
            </div>
          </div>
        )}

        {/* Test History Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Test Geçmişi</h2>
            <span className="text-gray-600">{totalTests} test tamamlandı</span>
          </div>

          {userResults.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Henüz test geçmişiniz yok
              </h3>
              <p className="text-gray-600 mb-4">
                İlk testinizi tamamlayarak kariyer yolculuğunuza başlayın!
              </p>
              <a href="/departments" className="btn-primary inline-block">
                İlk Testi Başlat
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {userResults.map((result) => (
                <TestHistoryCard key={result.questionnaireId} result={result} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
