import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Book, BarChart3, User } from "lucide-react";
import Layout from "../components/layout/Layout";

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const quickActions = [
    {
      title: "Bölüm Seç",
      description: "Kariyer testi için bölüm seçin",
      icon: Book,
      link: "/departments",
      color: "bg-blue-500",
    },
    {
      title: "Sonuçlarım",
      description: "Önceki test sonuçlarınızı görüntüleyin",
      icon: BarChart3,
      link: "/profile",
      color: "bg-green-500",
    },
    {
      title: "Profilim",
      description: "Profil bilgilerinizi ve test geçmişinizi görüntüleyin",
      icon: User,
      link: "/profile",
      color: "bg-purple-500",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hoş geldiniz, {user?.firstName} {user?.lastName}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Kariyer yolculuğunuzu keşfetmeye başlayın.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.link}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${action.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Son Test Sonuçlarınız
          </h2>
          <p className="text-gray-600 mb-4">Henüz test tamamlamadınız.</p>
          <Link to="/departments" className="btn-primary">
            İlk Testi Başlat
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
