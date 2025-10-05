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
  FileText,
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-sky-600 dark:text-sky-500" />
            </div>
            <p className="text-slate-800 dark:text-slate-200 font-medium">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-sky-600 dark:text-sky-500" />
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Yönlendiriliyor...
            </p>
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-sky-600 dark:text-sky-500" />
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Yönlendiriliyor...
            </p>
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
            className="inline-flex items-center text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors group"
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
        <div className="mb-8 fade-in-up">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
                {detail.careerName}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Alan detayları ve yol haritası
              </p>
            </div>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Summary */}
          <section
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6 border border-slate-200 dark:border-slate-700 fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-sky-100 dark:bg-sky-500/10 rounded-xl flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Alanın Özeti
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              {detail.summary}
            </p>
          </section>

          {/* Work Areas */}
          <section
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6 border border-slate-200 dark:border-slate-700 fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Çalışma Alanları
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {detail.workAreas}
            </p>
          </section>

          {/* Average Salary */}
          <section
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6 border border-slate-200 dark:border-slate-700 fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-500/10 rounded-xl flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Ortalama Maaş
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg font-semibold">
              {detail.averageSalary}
            </p>
          </section>

          {/* Resources */}
          <section
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6 border border-slate-200 dark:border-slate-700 fade-in-up"
            style={{ animationDelay: "250ms" }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/10 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Öğrenme Kaynakları
              </h2>
            </div>

            {detail.beginnerResources.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    1
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Başlangıç Seviyesi
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detail.beginnerResources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl hover:border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 transition-all duration-300 bg-slate-50 dark:bg-slate-700/30"
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        {res.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                        {res.description}
                      </p>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 text-sm hover:underline font-medium inline-flex items-center"
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
                  <span className="w-8 h-8 bg-amber-100 dark:bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm">
                    2
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Orta Seviye
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detail.intermediateResources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl hover:border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-500/5 transition-all duration-300 bg-slate-50 dark:bg-slate-700/30"
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        {res.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                        {res.description}
                      </p>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 dark:text-amber-400 text-sm hover:underline font-medium inline-flex items-center"
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
                  <span className="w-8 h-8 bg-rose-100 dark:bg-rose-500/10 rounded-lg flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold text-sm">
                    3
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    İleri Seviye
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detail.advancedResources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl hover:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-500/5 transition-all duration-300 bg-slate-50 dark:bg-slate-700/30"
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        {res.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                        {res.description}
                      </p>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 dark:text-rose-400 text-sm hover:underline font-medium inline-flex items-center"
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
          <section
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft p-6 border border-slate-200 dark:border-slate-700 fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-500/10 rounded-xl flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Proje Önerileri
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {detail.projectIdeas.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-5 border-2 border-slate-300 dark:border-slate-600 rounded-xl hover:border-cyan-500/30 hover:bg-cyan-50 dark:hover:bg-cyan-500/5 transition-all duration-300 bg-slate-50 dark:bg-slate-700/30 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                      {proj.title}
                    </h4>
                    <Star className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex items-center space-x-2 mb-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-lg ${
                        proj.difficulty === "Başlangıç"
                          ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                          : proj.difficulty === "Orta"
                          ? "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
                          : "bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20"
                      }`}
                    >
                      {proj.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 text-xs bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium border border-slate-300 dark:border-slate-500"
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
