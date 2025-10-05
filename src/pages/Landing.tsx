import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  BookOpen,
  BarChart3,
  Users,
  CheckCircle,
  Star,
  GraduationCap,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Landing: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const features = [
    {
      icon: Target,
      title: "Uyum Analizi Testi",
      description:
        "Veri destekli ve özenle hazırlanmış, bölümüne özel kariyer testleri",
      color: "from-sky-500 to-blue-500",
    },
    {
      icon: BookOpen,
      title: "Detaylı Alan Rehberi",
      description: "Başlangıçtan ileri seviyeye tam öğrenme yol haritası",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: BarChart3,
      title: "PDF İndirme",
      description: "Alan rehberlerini PDF olarak indir, her zaman yanında taşı",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    { number: "50+", label: "Soru Testi" },
    { number: "30+", label: "Kariyer Alanı" },
    { number: "500+", label: "Öğrenci" },
    { number: "%95", label: "Memnuniyet" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
      {/* Header with Theme Toggle */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-bold text-sm">AR</span>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    AlanRehberi
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
                    kariyer yolculuğunuzda
                  </p>
                </div>
              </div>
            </Link>

            {/* Theme Toggle and Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 border border-slate-200 dark:border-slate-700"
                title={isDark ? "Light mode'a geç" : "Dark mode'a geç"}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link to="/register" className="btn-primary">
                  Ücretsiz Başla
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-full px-4 py-2 mb-8">
              <Star className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Üniversite öğrencileri alan keşif platformu
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
              Kariyer Yolculuğuna
              <span className="block bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Hazır mısın?
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              Hangi meslek sana uygun? Veri destekli ve özenle hazırlanan
              testlerle güçlü yönlerini keşfet, sana en uygun kariyer yolunu
              öğren.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/register"
                className="btn-primary inline-flex items-center justify-center px-8 py-4"
              >
                Ücretsiz Başla
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary inline-flex items-center justify-center px-8 py-4"
              >
                Zaten Üyeysen Giriş Yap
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky-200 dark:bg-sky-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200 dark:bg-amber-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 dark:bg-emerald-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-30 animate-blob animation-delay-4000"></div>
      </section>

      <div className="flex justify-center">
        <hr className="w-1/2 border-t-2 border-slate-300 dark:border-slate-600 my-8" />
      </div>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Alan keşif sürecini basit ve etkili adımlara ayırdık
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/60 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 p-8 group fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-12 text-slate-800 dark:text-white shadow-2xl border border-slate-200/60 dark:border-slate-700/60">
            <GraduationCap className="h-16 w-16 mx-auto mb-6 text-amber-500 dark:text-amber-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">
              Alan Keşfine Hemen Başla
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Veri destekli ve özenle hazırlanan testlerle güçlü yönlerini sana
              en uygun kariyer yollarını keşfet ve mezuniyet sonrası için
              hazırlan.
            </p>
            <Link
              to="/register"
              className="btn-primary inline-flex items-center"
            >
              Hemen Keşfet
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200/60 dark:border-slate-700/60 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                AlanRehberi
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
              Üniversite öğrencileri için hazırlanmış alan rehberliği
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-xs">
              © 2025 AlanRehberi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
