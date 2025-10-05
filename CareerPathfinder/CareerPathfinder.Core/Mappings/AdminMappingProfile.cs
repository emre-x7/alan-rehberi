using AutoMapper;
using CareerPathfinder.Core.DTOs.Admin;
using CareerPathfinder.Core.Entities;
using System.Text.Json;

namespace CareerPathfinder.Core.Mappings
{
    public class AdminMappingProfile : Profile
    {
        public AdminMappingProfile()
        {
            // Department -> AdminDepartmentDto
            CreateMap<Department, AdminDepartmentDto>()
                .ForMember(dest => dest.QuestionCount,
                    opt => opt.MapFrom(src => src.Questions.Count(q => q.IsActive)))
                .ForMember(dest => dest.CareerCount,
                    opt => opt.MapFrom(src => src.Careers.Count));

            // Question -> AdminQuestionDto
            CreateMap<Question, AdminQuestionDto>()
                .ForMember(dest => dest.DepartmentName,
                    opt => opt.MapFrom(src => src.Department.Name))
                .ForMember(dest => dest.AnswerCount,
                    opt => opt.MapFrom(src => src.Answers.Count));

            // Career -> AdminCareerDto
            CreateMap<Career, AdminCareerDto>()
                .ForMember(dest => dest.DepartmentName,
                    opt => opt.MapFrom(src => src.Department.Name))
                .ForMember(dest => dest.ScoreCount,
                    opt => opt.MapFrom(src => src.CareerScores.Count))
                .ForMember(dest => dest.ResultCount,
                    opt => opt.MapFrom(src => src.TestResults.Count))
                .ForMember(dest => dest.HasDetail,
                    opt => opt.MapFrom(src => src.CareerDetail != null)); 

            // AppUser -> AdminUserDto
            CreateMap<AppUser, AdminUserDto>()
                .ForMember(dest => dest.LastLoginAt,
                    opt => opt.MapFrom(src => src.LastLoginAt))
                .ForMember(dest => dest.University,
                    opt => opt.MapFrom(src => src.University))
                .ForMember(dest => dest.Department,
                    opt => opt.MapFrom(src => src.Department))
                .ForMember(dest => dest.AcademicYear,
                    opt => opt.MapFrom(src => src.AcademicYear))
                .ForMember(dest => dest.Gender,
                    opt => opt.MapFrom(src => src.Gender))
                .ForMember(dest => dest.Roles,
                    opt => opt.Ignore());

            // CareerDetail -> AdminCareerDetailDto
            CreateMap<CareerDetail, AdminCareerDetailDto>()
                .ForMember(dest => dest.CareerName,
                    opt => opt.MapFrom(src => src.Career.Name))
                .ForMember(dest => dest.BeginnerResources,
                    opt => opt.MapFrom(src => DeserializeResources(src.BeginnerResources)))
                .ForMember(dest => dest.IntermediateResources,
                    opt => opt.MapFrom(src => DeserializeResources(src.IntermediateResources)))
                .ForMember(dest => dest.AdvancedResources,
                    opt => opt.MapFrom(src => DeserializeResources(src.AdvancedResources)))
                .ForMember(dest => dest.ProjectIdeas,
                    opt => opt.MapFrom(src => DeserializeProjects(src.ProjectIdeas)));
        }

        private List<ResourceItemDto> DeserializeResources(string? jsonResources)
        {
            if (string.IsNullOrEmpty(jsonResources))
                return new List<ResourceItemDto>();

            try
            {
                return JsonSerializer.Deserialize<List<ResourceItemDto>>(jsonResources)
                    ?? new List<ResourceItemDto>();
            }
            catch
            {
                return new List<ResourceItemDto>();
            }
        }

        private List<ProjectIdeaDto> DeserializeProjects(string? jsonProjects)
        {
            if (string.IsNullOrEmpty(jsonProjects))
                return new List<ProjectIdeaDto>();

            try
            {
                return JsonSerializer.Deserialize<List<ProjectIdeaDto>>(jsonProjects)
                    ?? new List<ProjectIdeaDto>();
            }
            catch
            {
                return new List<ProjectIdeaDto>();
            }
        }
    }
}

