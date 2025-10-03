import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchCareerDetail,
  downloadCareerPdf,
  clearDetail,
} from "../store/careerDetail/careerDetailSlice";
import Layout from "../components/layout/Layout";
import {
  Loader,
  AlertCircle,
  ArrowLeft,
  Download,
  DollarSign,
  Briefcase,
  BookOpen,
  Lightbulb,
  Target,
  Users,
  Star,
} from "lucide-react";

const CareerDetail: React.FC = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { detail, isLoading, error } = useAppSelector(
    (state) => state.careerDetail
  );

  useEffect(() => {
    const id = parseInt(careerId || "0", 10);

    if (!id || isNaN(id)) {
      navigate("/profile");
      return;
    }

    dispatch(fetchCareerDetail(id));

    return () => {
      dispatch(clearDetail());
    };
  }, [careerId, dispatch, navigate]);

  useEffect(() => {
    if (error && !isLoading) {
      navigate("/profile");
    }
  }, [error, isLoading, navigate]);

  const handleDownloadPdf = () => {
    if (!detail) return;
    dispatch(downloadCareerPdf(detail.careerId))
      .unwrap()
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${detail.careerName}_Kariyer_Rehberi.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        alert(
          "PDF indirme sırasında bir hata oluştu: " + (err || "Bilinmeyen hata")
        );
        console.error("PDF indirme hatası:", err);
      });
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
              Kariyer detayları yükleniyor...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || (!detail && !isLoading)) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-blue-600" />
            </div>
            <p className="text-slate-600">Yönlendiriliyor...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!detail) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-blue-600" />
            </div>
            <p className="text-slate-600">Yönlendiriliyor...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <Link
            to="/profile"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Profile Dön
          </Link>
          <button
            onClick={handleDownloadPdf}
            className="btn-accent flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF İndir
          </button>
        </div>

        {/* Title */}
        <div className="mb-8 fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                {detail.careerName}
              </h1>
              <p className="text-slate-600 mt-2">
                Kariyer Detayları ve Yol Haritası
              </p>
            </div>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Summary */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-soft">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Kariyer Özeti
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg">
              {detail.summary}
            </p>
          </section>

          {/* Work Areas */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-soft">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Çalışma Alanları
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed">{detail.workAreas}</p>
          </section>

          {/* Average Salary */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-soft">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Ortalama Maaş
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg font-semibold">
              {detail.averageSalary}
            </p>
          </section>

          {/* Resources */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-soft">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Öğrenme Kaynakları
              </h2>
            </div>

            {detail.beginnerResources.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-sm">
                    1
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Başlangıç Seviyesi
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detail.beginnerResources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-2 border-slate-200 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300 bg-white"
                    >
                      <h4 className="font-semibold text-slate-900 mb-2">
                        {res.title}
                      </h4>
                      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                        {res.description}
                      </p>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 text-sm hover:underline font-medium inline-flex items-center"
                      >
                        Kaynağa Git
                        <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detail.intermediateResources.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-sm">
                    2
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Orta Seviye
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detail.intermediateResources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-2 border-slate-200 rounded-xl hover:border-amber-200 hover:bg-amber-50 transition-all duration-300 bg-white"
                    >
                      <h4 className="font-semibold text-slate-900 mb-2">
                        {res.title}
                      </h4>
                      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                        {res.description}
                      </p>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 text-sm hover:underline font-medium inline-flex items-center"
                      >
                        Kaynağa Git
                        <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detail.advancedResources.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 font-bold text-sm">
                    3
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    İleri Seviye
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detail.advancedResources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-2 border-slate-200 rounded-xl hover:border-rose-200 hover:bg-rose-50 transition-all duration-300 bg-white"
                    >
                      <h4 className="font-semibold text-slate-900 mb-2">
                        {res.title}
                      </h4>
                      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                        {res.description}
                      </p>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 text-sm hover:underline font-medium inline-flex items-center"
                      >
                        Kaynağa Git
                        <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Project Ideas */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-soft">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Proje Önerileri
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {detail.projectIdeas.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-5 border-2 border-slate-200 rounded-xl hover:border-cyan-200 hover:bg-cyan-50 transition-all duration-300 bg-white group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-cyan-700">
                      {proj.title}
                    </h4>
                    <Star className="h-5 w-5 text-amber-400" />
                  </div>
                  <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex items-center space-x-2 mb-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-lg ${
                        proj.difficulty === "Başlangıç"
                          ? "bg-emerald-100 text-emerald-700"
                          : proj.difficulty === "Orta"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {proj.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CareerDetail;
