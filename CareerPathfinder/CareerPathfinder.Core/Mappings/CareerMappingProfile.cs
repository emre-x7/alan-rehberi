using AutoMapper;
using CareerPathfinder.Core.DTOs.Careers;
using CareerPathfinder.Core.Entities;
using System.Text.Json;

namespace CareerPathfinder.Core.Mappings
{
    public class CareerMappingProfile : Profile
    {
        public CareerMappingProfile()
        {
            // CareerDetail -> CareerDetailDto
            CreateMap<CareerDetail, CareerDetailDto>()
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

        private List<ResourceItem> DeserializeResources(string? jsonResources)
        {
            if (string.IsNullOrEmpty(jsonResources))
                return new List<ResourceItem>();

            try
            {
                return JsonSerializer.Deserialize<List<ResourceItem>>(jsonResources)
                    ?? new List<ResourceItem>();
            }
            catch
            {
                return new List<ResourceItem>();
            }
        }

        private List<ProjectIdea> DeserializeProjects(string? jsonProjects)
        {
            if (string.IsNullOrEmpty(jsonProjects))
                return new List<ProjectIdea>();

            try
            {
                return JsonSerializer.Deserialize<List<ProjectIdea>>(jsonProjects)
                    ?? new List<ProjectIdea>();
            }
            catch
            {
                return new List<ProjectIdea>();
            }
        }
    }
}