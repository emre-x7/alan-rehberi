// src/pages/Departments.tsx - YENİ DARK MODE
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchDepartments } from "../store/department/departmentSlice";
import DepartmentCard from "../components/departments/DepartmentCard";
import Layout from "../components/layout/Layout";
import {
  Loader,
  AlertCircle,
  Book,
  Sparkles,
  GraduationCap,
  Target,
  Users,
  Clock,
} from "lucide-react";

const Departments: React.FC = () => {
  const dispatch = useAppDispatch();
  const { departments, isLoading, error } = useAppSelector(
    (state) => state.departments
  );

  useEffect(() => {
    console.log("🔄 Departments Page - Fetching DEPARTMENTS");
    dispatch(fetchDepartments());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl mb-4">
              <Loader className="h-8 w-8 animate-spin text-sky-500" />
            </div>
            <p className="text-slate-200 font-medium">Bölümler yükleniyor...</p>
            <p className="text-sm text-slate-400 mt-2">
              Heyecan verici kariyer yolları geliyor
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-6 px-6">
          <div className="bg-rose-500/10 border-2 border-rose-500/20 text-rose-300 px-6 py-4 rounded-xl flex items-center shadow-lg">
            <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-semibold">Bir hata oluştu</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Hangi Alanda Kariyer Yapmak İstersin?
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            İlgi alanına uygun bir bölüm seç ve 30-40 soruluk kişiselleştirilmiş
            testimizle kariyer yolculuğuna başla
          </p>
        </div>

        {/* Departments Grid */}
        {departments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {departments.map((department, index) => (
              <div
                key={department.id}
                className="fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DepartmentCard department={department} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 card">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-700 rounded-2xl mb-4">
              <Book className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Henüz Bölüm Eklenmemiş
            </h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Yakında birçok bölüm için kariyer testleri eklenecek. Takipte kal!
            </p>
          </div>
        )}

        {/* Info Banner */}
        {departments.length > 0 && (
          <div
            className="card p-8 fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-sky-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">
                  Nasıl Çalışır?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-3">
                    <span className="w-8 h-8 bg-sky-500/10 rounded-lg flex items-center justify-center text-sky-400 font-semibold text-sm flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-medium text-slate-100 mb-1">
                        Bölüm Seç
                      </p>
                      <p className="text-sm text-slate-400">
                        İlgi alanına uygun bir bölüm seç
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 font-semibold text-sm flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-slate-100 mb-1">
                        Testi Çöz
                      </p>
                      <p className="text-sm text-slate-400">
                        30-40 soruyu samimi cevapla
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 font-semibold text-sm flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-medium text-slate-100 mb-1">
                        Sonuçları Gör
                      </p>
                      <p className="text-sm text-slate-400">
                        Kişiselleştirilmiş kariyer önerileri
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Departments;
