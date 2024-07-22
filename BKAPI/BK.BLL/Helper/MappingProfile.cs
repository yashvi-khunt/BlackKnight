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

        CreateMap<Product,VMAddProduct>().ReverseMap();
        CreateMap<ProductImage, VMAddProductImage>().ReverseMap();
        
        CreateMap<Product, VMProductDetails>()
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.Name))
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Brand.Client.UserName))
            .ForMember(dest => dest.TopPaperTypeName, opt => opt.MapFrom(src => src.TopPaperType.Type))
            .ForMember(dest => dest.FlutePaperTypeName, opt => opt.MapFrom(src => src.FlutePaperType.Type))
            .ForMember(dest => dest.BackPaperTypeName, opt => opt.MapFrom(src => src.BackPaperType.Type))
            .ForMember(dest => dest.PrintTypeName, opt => opt.MapFrom(src => src.PrintType.Name))
            .ForMember(dest => dest.TopPrice, opt => opt.MapFrom<TopPriceResolver>())
            .ForMember(dest => dest.FlutePrice, opt => opt.MapFrom<FlutePriceResolver>())
            .ForMember(dest => dest.BackPrice, opt => opt.MapFrom<BackPriceResolver>())
            .ForMember(dest => dest.LaminationRate, opt => opt.MapFrom<LaminationRateResolver>());
    }
    
    public class TopPriceResolver : IValueResolver<Product, VMProductDetails, double>
    {
        public double Resolve(Product src, VMProductDetails dest, double destMember, ResolutionContext context)
        {
            double DCN = src.Deckle * src.Cutting * src.NoOfSheerPerBox;
            return DCN * src.Top * src.TopPaperType.Price / (1550 * 1000);
        }
    }

    public class FlutePriceResolver : IValueResolver<Product, VMProductDetails, double>
    {
        public double Resolve(Product src, VMProductDetails dest, double destMember, ResolutionContext context)
        {
            double DCN = src.Deckle * src.Cutting * src.NoOfSheerPerBox;
            int NumberOfFluteSheets = src.Ply / 2;
            return DCN * src.Flute * src.FlutePaperType.Price * NumberOfFluteSheets * src.JobWorker.FluteRate / (1550 * 1000);
        }
    }

    public class BackPriceResolver : IValueResolver<Product, VMProductDetails, double>
    {
        public double Resolve(Product src, VMProductDetails dest, double destMember, ResolutionContext context)
        {
            double DCN = src.Deckle * src.Cutting * src.NoOfSheerPerBox;
            int NumberOfBackSheets = src.Ply / 2;
            return DCN * src.Back * src.BackPaperType.Price * NumberOfBackSheets / (1550 * 1000);
        }
    }

    public class LaminationRateResolver : IValueResolver<Product, VMProductDetails, double?>
    {
        public double? Resolve(Product src, VMProductDetails dest, double? destMember, ResolutionContext context)
        {
            if (!src.IsLamination) return null;
            double DCN = src.Deckle * src.Cutting * src.NoOfSheerPerBox;
            return DCN * src.TopPaperType.LaminationPercent / 100;
        }
    }
}