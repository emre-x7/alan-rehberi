import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchDepartments } from "../store/department/departmentSlice";
import DepartmentCard from "../components/departments/DepartmentCard";
import Layout from "../components/layout/Layout";
import { Loader, AlertCircle, Book } from "lucide-react";

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
            <Loader className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Bölümler yükleniyor...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Kariyer Testi Bölümleri
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            İlgi alanınıza göre bir bölüm seçin ve kariyer testine başlayın
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>

        {/* Empty State */}
        {departments.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz bölüm bulunmuyor
            </h3>
            <p className="text-gray-600">
              Sistem yöneticisi bölümleri ekleyecek.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Departments;
