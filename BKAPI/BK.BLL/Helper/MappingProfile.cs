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
            .ForMember(dest => dest.GSTNumber, opt => opt.MapFrom(src => src.User.GSTNumber));

        CreateMap<Product, VMAddProduct>().ReverseMap();
        CreateMap<ProductImage, VMAddProductImage>().ReverseMap();

        CreateMap<Product, VMProductDetails>()
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.Name))
            .ForMember(dest => dest.Images,opt=>opt.MapFrom(src => src.Images))
            .ForMember(dest => dest.ClientId, opt => opt.MapFrom(src => src.Brand.Client.Id))
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Brand.Client.UserName))
            .ForMember(dest => dest.JobWorkerName, opt => opt.MapFrom(src => src.JobWorker.User.CompanyName))
            .ForMember(dest => dest.TopPaperTypeName, opt => opt.MapFrom(src => src.TopPaperType.Type))
            .ForMember(dest => dest.FlutePaperTypeName, opt => opt.MapFrom(src => src.FlutePaperType.Type))
            .ForMember(dest => dest.BackPaperTypeName, opt => opt.MapFrom(src => src.BackPaperType.Type))
            .ForMember(dest => dest.PrintTypeName, opt => opt.MapFrom(src => src.PrintType.Name))
            .ForMember(dest => dest.TopPrice, opt => opt.MapFrom<TopPriceResolver>())
            .ForMember(dest => dest.FlutePrice, opt => opt.MapFrom<FlutePriceResolver>())
            .ForMember(dest => dest.BackPrice, opt => opt.MapFrom<BackPriceResolver>())
            .ForMember(dest => dest.LaminationPrice, opt => opt.MapFrom<LaminationPriceResolver>())
            .ForMember(dest => dest.JobWorkerPrice, opt => opt.MapFrom<JobWorkerPriceResolver>())
            .ForMember(dest => dest.FinalRate, opt => opt.MapFrom<FinalRateResolver>());
        ;


        CreateMap<VMProductDetails, VMAllProducts>()
            .ForMember(dest => dest.PrimaryImage,
                opt => opt.MapFrom(src =>src.Images.FirstOrDefault(s => s.IsPrimary == true).ImagePath));

        CreateMap<VMAddBrand, Brand>();
        CreateMap<Brand, VMBrandDetails>()
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Client.UserName)); 

        
        CreateMap<Order, VMGetAllOrder>()
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Client.CompanyName)) 
            .ForMember(dest => dest.PrimaryImage, opt => opt.MapFrom(src => src.Product.Images.FirstOrDefault(i => i.IsPrimary).ImagePath))
            .ForMember(dest=>dest.JobWorkerName,opt=>opt.MapFrom(src => src.Product.JobWorker.User.CompanyName))
            .ForMember(dest => dest.BoxName, opt => opt.MapFrom(src => src.Product.BoxName))
            .ForMember(dest => dest.ProfitPercent, opt => opt.MapFrom(src => src.Product.ProfitPercent));
    }
}