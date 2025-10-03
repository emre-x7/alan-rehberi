import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DepartmentDto } from "../../types/department";
import { Book, Users, ArrowRight, Target, Star } from "lucide-react";
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
      <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 hover:border-transparent hover:shadow-strong transition-all duration-500 transform hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {department.name}
            </h3>
            {department.description && (
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
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

        {/* Stats */}
        <div className="flex items-center justify-between mb-6 py-4 px-4 bg-slate-50/80 rounded-xl border border-slate-200/60">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Soru</p>
              <p className="text-sm font-bold text-slate-900">
                {department.questionCount}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Kariyer</p>
              <p className="text-sm font-bold text-slate-900">
                {department.careerCount}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Star className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Süre</p>
              <p className="text-sm font-bold text-slate-900">15 dk</p>
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
        title="Testi Başlatmak İstediğinden Emin misin?"
        message={`${department.name} bölümü için kariyer testini başlatmak üzeresin. Test yaklaşık 10-15 dakika sürecek ve sana özel kariyer önerileri sunacağız.`}
        confirmText="Evet, Başlat"
        cancelText="Hayır, İptal"
      />
    </>
  );
};

export default DepartmentCard;
