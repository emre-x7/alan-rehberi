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
} from "lucide-react";

const Landing: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: "Kişiselleştirilmiş Test",
      description:
        "Bilimsel metodlarla hazırlanmış, bölümüne özel kariyer testleri",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: "Detaylı Kariyer Rehberi",
      description: "Başlangıçtan ileri seviyeye tam öğrenme yol haritası",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: BarChart3,
      title: "PDF İndirme",
      description:
        "Kariyer rehberlerini PDF olarak indir, her zaman yanında taşı",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    { number: "30-40", label: "Soru Testi" },
    { number: "50+", label: "Kariyer Alanı" },
    { number: "1000+", label: "Mutlu Öğrenci" },
    { number: "%95", label: "Memnuniyet" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full px-4 py-2 mb-8">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-slate-700">
                Üniversite öğrencileri için kariyer keşif platformu
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Kariyer Yolculuğuna
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Hazır mısın?
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Hangi meslek sana uygun? Bilimsel testlerle kişiliğine ve
              yeteneklerine en uygun kariyer yolunu keşfet.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Ücretsiz Başla
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
              >
                Zaten Üyeysen Giriş Yap
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Kariyer keşif sürecini basit ve etkili adımlara ayırdık
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-slate-200/60 hover:border-transparent hover:shadow-2xl transition-all duration-500"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
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
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white shadow-2xl">
            <GraduationCap className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kariyer Yolculuğuna Bugün Başla
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              30-40 soruluk kişiselleştirilmiş testimizle sana en uygun kariyer
              yollarını keşfet ve mezuniyet sonrası için hazırlan.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Hemen Keşfet
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
