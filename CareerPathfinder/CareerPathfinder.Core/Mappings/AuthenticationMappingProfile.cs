using AutoMapper;
using CareerPathfinder.Core.DTOs.Authentication;
using CareerPathfinder.Core.Entities;

namespace CareerPathfinder.Core.Mappings
{
    public class AuthenticationMappingProfile : Profile
    {
        public AuthenticationMappingProfile()
        {
            // RegisterRequest -> AppUser
            CreateMap<RegisterRequest, AppUser>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.University, opt => opt.MapFrom(src => src.University))
                .ForMember(dest => dest.Department, opt => opt.MapFrom(src => src.Department))
                .ForMember(dest => dest.AcademicYear, opt => opt.MapFrom(src => src.AcademicYear))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender));

            // AppUser -> AuthResponse
            CreateMap<AppUser, AuthResponse>()
                .ForMember(dest => dest.University, opt => opt.MapFrom(src => src.University))
                .ForMember(dest => dest.Department, opt => opt.MapFrom(src => src.Department))
                .ForMember(dest => dest.AcademicYear, opt => opt.MapFrom(src => src.AcademicYear))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender));
        }
    }
}