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
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));
        }
    }
}