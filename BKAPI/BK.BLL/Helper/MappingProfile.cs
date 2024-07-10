using AutoMapper;
using BK.DAL.Models;
using BK.DAL.ViewModels;

namespace BK.BLL.Helper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ApplicationUser,VMAddClient>().ReverseMap();
    }
}