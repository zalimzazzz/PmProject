using System.Linq;
using AutoMapper;
using PmProject.API.Dtos;
using PmProject.API.Models;

namespace PmProject.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotosForDetailDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<Company, CompanyForReturnDto>();
            CreateMap<TemplateServiceOrderDto, TemplateServiceOrder>().ReverseMap();
            CreateMap<TemplateServiceOrderQuestionDto, TemplateServiceOrderQuestion>().ReverseMap();
            CreateMap<TemplateServiceOrderAnswerDto, TemplateServiceOrderAnswer>().ReverseMap();
            CreateMap<ProjectDto, Project>().ReverseMap();
        }
    }
}