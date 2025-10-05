// src/components/departments/DepartmentCard.tsx - YENİ DARK MODE
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DepartmentDto } from "../../types/department";
import { Book, Users, ArrowRight, Target, Star, Clock } from "lucide-react";
import ConfirmationModal from "../forms/ConfirmationModal";

interface DepartmentCardProps {
  department: DepartmentDto;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleStartTest = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    navigate(`/questionnaire/${department.id}`);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="group card-interactive p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {department.name}
            </h3>
            {department.description && (
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                {department.description}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Book className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Stats - LIGHT MODE DÜZELTMESİ */}
        <div className="flex items-center justify-between mb-6 py-4 px-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sky-100 dark:bg-sky-500/10 rounded-lg flex items-center justify-center">
              <Target className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Soru</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {department.questionCount}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Alan</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {department.careerCount}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Süre</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                15 dk
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStartTest}
          className="w-full btn-primary flex items-center justify-center group"
        >
          Teste Başla
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title="Testi başlatmak istediğinden emin misin?"
        message={`${department.name} bölümü için kariyer testini başlatmak üzeresin. Test yaklaşık 10-15 dakika sürecek ve sana özel kariyer önerileri sunacağız.`}
        confirmText="Evet, Başlat"
        cancelText="Hayır, İptal"
      />
    </>
  );
};

export default DepartmentCard;
