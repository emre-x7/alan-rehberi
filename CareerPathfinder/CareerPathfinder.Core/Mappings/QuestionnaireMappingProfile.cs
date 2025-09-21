using AutoMapper;
using CareerPathfinder.Core.DTOs.Questions;
using CareerPathfinder.Core.DTOs.Questionnaire;
using CareerPathfinder.Core.DTOs.Results;
using CareerPathfinder.Core.Entities;

namespace CareerPathfinder.Core.Mappings
{
    public class QuestionnaireMappingProfile : Profile
    {
        public QuestionnaireMappingProfile()
        {
            // Question -> QuestionDto
            CreateMap<Question, QuestionDto>();

            // AnswerDto -> Answer
            CreateMap<AnswerDto, Answer>()
                .ForMember(dest => dest.AnsweredAt, opt => opt.MapFrom(src => DateTime.UtcNow));

            // TestResult -> CareerResultDto
            CreateMap<TestResult, CareerResultDto>()
                .ForMember(dest => dest.CareerName, opt => opt.MapFrom(src => src.Career.Name))
                .ForMember(dest => dest.CareerDescription, opt => opt.MapFrom(src => src.Career.Description));

            // Questionnaire -> QuestionnaireResultDto
            CreateMap<Questionnaire, QuestionnaireResultDto>()
                .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Department.Name))
                .ForMember(dest => dest.CareerResults, opt => opt.MapFrom(src => src.TestResults));
        }
    }
}