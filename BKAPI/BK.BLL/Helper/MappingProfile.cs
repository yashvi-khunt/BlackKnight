using AutoMapper;
using BK.DAL.Models;
using BK.DAL.ViewModels;

namespace BK.BLL.Helper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ApplicationUser, VMAddClient>().ReverseMap();
        CreateMap<JobWorker, VMJobworkerDetails>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.User.Id))
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.User.CompanyName))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
            .ForMember(dest => dest.UserPassword, opt => opt.MapFrom(src => src.User.UserPassword))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.User.PhoneNumber))
            .ForMember(dest => dest.GSTNumber, opt => opt.MapFrom(src => src.User.GSTNumber))
            .ForMember(dest => dest.GSTNumber, opt => opt.MapFrom(src => src.User.GSTNumber));
    }
}