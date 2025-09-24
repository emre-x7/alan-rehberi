import React from "react";
import { Link } from "react-router-dom";
import { DepartmentDto } from "../../types/department";
import { Book, Users, ArrowRight } from "lucide-react";

interface DepartmentCardProps {
  department: DepartmentDto;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {department.name}
          </h3>
          {department.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {department.description}
            </p>
          )}
        </div>
        <Book className="h-8 w-8 text-primary-600 flex-shrink-0 ml-4" />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Book className="h-4 w-4 mr-1" />
          <span>{department.questionCount} soru</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{department.careerCount} kariyer</span>
        </div>
      </div>

      <Link
        to={`/questionnaire/${department.id}`}
        className="w-full btn-primary flex items-center justify-center"
      >
        Testi Başlat
        <ArrowRight className="h-4 w-4 ml-2" />
      </Link>
    </div>
  );
};

export default DepartmentCard;
