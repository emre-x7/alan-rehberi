import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import {
  Book,
  BarChart3,
  Target,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Award,
} from "lucide-react";
import Layout from "../components/layout/Layout";

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const quickActions = [
    {
      title: "Kariyer Testini Başlat",
      description: "Sana en uygun kariyer alanlarını keşfet",
      icon: Book,
      link: "/departments",
      color: "from-blue-500 to-cyan-500",
      badge: "Popüler",
    },
    {
      title: "Test Sonuçlarım",
      description: "Önceki test sonuçlarını ve kariyer önerilerini gör",
      icon: BarChart3,
      link: "/profile",
      color: "from-emerald-500 to-green-500",
      badge: null,
    },
  ];

  const stats = [
    {
      icon: Target,
      title: "Kişiselleştirilmiş",
      description:
        "Bilimsel yöntemlerle senin için en uygun kariyerleri belirliyoruz",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: GraduationCap,
      title: "Detaylı Rehber",
      description: "Her kariyer için başlangıçtan ileri seviyeye kaynaklar",
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      icon: Users,
      title: "Topluluk",
      description: "Binlerce öğrenci ile birlikte gelişim fırsatı",
      color: "text-purple-600 bg-purple-100",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Hero Section */}
        <div className="mb-12 fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Merhaba, {user?.firstName}! 👋
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Kariyer yolculuğunda bir sonraki adımı atmaya hazır mısın?
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.link}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-strong transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-slate-200/60"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                {action.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                      {action.badge}
                    </span>
                  </div>
                )}

                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-4 bg-gradient-to-br ${action.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="card p-6 text-center group hover:shadow-strong transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  {stat.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-strong p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            <Award className="h-12 w-12 mx-auto mb-4 text-white/90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Kariyer Yolculuğuna Bugün Başla
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              30-40 soruluk kişiselleştirilmiş testimizle sana en uygun kariyer
              yollarını keşfet ve mezuniyet sonrası için hazırlan.
            </p>
            <Link
              to="/departments"
              className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Teste Başla
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
