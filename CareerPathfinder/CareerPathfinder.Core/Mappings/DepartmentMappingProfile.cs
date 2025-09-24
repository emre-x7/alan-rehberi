using AutoMapper;
using CareerPathfinder.Core.DTOs.Departments;
using CareerPathfinder.Core.Entities;

namespace CareerPathfinder.Core.Mappings
{
    public class DepartmentMappingProfile : Profile
    {
        public DepartmentMappingProfile()
        {
            CreateMap<Department, DepartmentDto>()
                .ForMember(dest => dest.QuestionCount,
                    opt => opt.MapFrom(src => src.Questions.Count(q => q.IsActive)))
                .ForMember(dest => dest.CareerCount,
                    opt => opt.MapFrom(src => src.Careers.Count));
        }
    }
}