using AutoMapper;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using BK.DAL.ViewModels.PaperType;
using BK.DAL.ViewModels.Wishlist;

namespace BK.BLL.Helper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ApplicationUser, VMAddClient>().ReverseMap();
        CreateMap<ApplicationUser, VMUpdateAdmin>().ReverseMap();
        CreateMap<JobWorker, VMAddJobworker>()
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.User.CompanyName))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
            .ForMember(dest => dest.UserPassword, opt => opt.MapFrom(src => src.User.UserPassword))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.User.PhoneNumber))
            .ForMember(dest => dest.GSTNumber, opt => opt.MapFrom(src => src.User.GSTNumber));

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
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images))
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



        CreateMap<VMProductDetails, VMAllProducts>()
            .ForMember(dest => dest.PrimaryImage,
                opt => opt.MapFrom(src => src.Images.FirstOrDefault(s => s.IsPrimary == true).ImagePath));

        CreateMap<VMAddBrand, Brand>();
        CreateMap<Brand, VMBrandDetails>()
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Client.UserName));


        CreateMap<Order, VMGetAllOrder>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Product.Brand.Client.CompanyName))
            .ForMember(dest => dest.PrimaryImage,
                opt => opt.MapFrom(src => src.Product.Images.FirstOrDefault(i => i.IsPrimary).ImagePath))
            .ForMember(dest => dest.JobWorkerName, opt => opt.MapFrom(src => src.Product.JobWorker.User.CompanyName))
            .ForMember(dest => dest.BoxName, opt => opt.MapFrom(src => src.Product.BoxName))
            .ForMember(dest => dest.ProfitPercent, opt => opt.MapFrom(src => src.Product.ProfitPercent));

        CreateMap<VMProductDetails, VMGetCartItem>()
            .ForMember(dest => dest.Image,
                opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsPrimary).ImagePath))
            .ForMember(dest => dest.BoxName, opt => opt.MapFrom(src => src.BoxName))
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.ClientName))
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.BrandName))
            .ForMember(dest => dest.JobWorkerRate, opt => opt.MapFrom(src => src.JobWorkerPrice))
            .ForMember(dest => dest.FinalRate, opt => opt.MapFrom(src => src.FinalRate));



        CreateMap<Order, VMOrderDetails>().ReverseMap();

        CreateMap<PaperType, VMAddPaperType>().ReverseMap();
        CreateMap<PaperType, VMPaperTypeDetails>().ReverseMap();


        // Map CartItem to VMGetCartItem
        CreateMap<CartItem, VMGetCartItem>()
            .ForMember(dest => dest.Image,
                opt => opt.MapFrom(src => src.Product.Images.FirstOrDefault(i => i.IsPrimary).ImagePath))
            .ForMember(dest => dest.BrandId, opt => opt.MapFrom(src => src.Product.Brand.Id))
            .ForMember(dest => dest.WishlisterId, opt => opt.MapFrom(src => src.ClientId))
            .ForMember(dest => dest
                .WishlisterName, opt => opt.MapFrom(src => src.Client.CompanyName))
            .ForMember(dest => dest.BoxName, opt => opt.MapFrom(src => src.Product.BoxName))
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Product.Brand.Client.CompanyName))
            .ForMember(dest => dest.ClientId, opt => opt.MapFrom(src => src.Product.Brand.Client.Id))
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Product.Brand.Name))
            .ForMember(dest => dest.JobWorkerRate, opt => opt.Ignore()) // Casting to float
            .ForMember(dest => dest.FinalRate, opt => opt.Ignore()) // We'll calculate this after mapping
            .AfterMap((src, dest, context) =>
            {
                // Map Product to VMProductDetails to calculate prices
                var productDetails = context.Mapper.Map<VMProductDetails>(src.Product);

                // Now that we have VMProductDetails, set the necessary fields
                dest.FinalRate = (float)productDetails.FinalRate; // Casting double to float
                dest.JobWorkerRate = (float)productDetails.JobWorkerPrice; // Casting double to float
            });

        CreateMap<CartItem, Order>()
            .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.Product.Id))
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Product.Brand.Name)) 
            .ForMember(dest => dest.ClientId, opt => opt.MapFrom(src => src.Product.Brand.ClientId))
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));


        CreateMap<VMProductDetails, Order>()
            .ForMember(dest => dest.ProductId,
                opt => opt.MapFrom(src => src.Id)) // Assuming Id in VMProductDetails maps to ProductId in Order
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.BrandName))
            .ForMember(dest => dest.ClientId, opt => opt.MapFrom(src => src.ClientId))
            .ForMember(dest => dest.JobWorkerId, opt => opt.MapFrom(src => src.JobWorkerId))
            .ForMember(dest => dest.ProfitPercent, opt => opt.MapFrom(src => src.ProfitPercent))
            .ForMember(dest => dest.LinerJobworkerId, opt => opt.MapFrom(src => src.LinerJobworkerId))
            .ForMember(dest => dest.TopPaperTypeName, opt => opt.MapFrom(src => src.TopPaperTypeName))
            .ForMember(dest => dest.FlutePaperTypeName, opt => opt.MapFrom(src => src.FlutePaperTypeName))
            .ForMember(dest => dest.BackPaperTypeName, opt => opt.MapFrom(src => src.BackPaperTypeName))
            .ForMember(dest => dest.Top, opt => opt.MapFrom(src => src.Top))
            .ForMember(dest => dest.Flute, opt => opt.MapFrom(src => src.Flute))
            .ForMember(dest => dest.Back, opt => opt.MapFrom(src => src.Back))
            .ForMember(dest => dest.Ply, opt => opt.MapFrom(src => src.Ply))
            .ForMember(dest => dest.NoOfSheetPerBox, opt => opt.MapFrom(src => src.NoOfSheetPerBox))
            .ForMember(dest => dest.DieCode, opt => opt.MapFrom(src => src.DieCode))
            .ForMember(dest => dest.PrintTypeName, opt => opt.MapFrom(src => src.PrintTypeName))
            .ForMember(dest => dest.PrintingPlate, opt => opt.MapFrom(src => src.PrintingPlate))
            .ForMember(dest => dest.TopPrice, opt => opt.MapFrom(src => src.TopPrice))
            .ForMember(dest => dest.FlutePrice, opt => opt.MapFrom(src => src.FlutePrice))
            .ForMember(dest => dest.BackPrice, opt => opt.MapFrom(src => src.BackPrice))
            .ForMember(dest => dest.PrintRate, opt => opt.MapFrom(src => src.PrintRate))
            .ForMember(dest => dest.LaminationPrice, opt => opt.MapFrom(src => src.LaminationPrice))
            .ForMember(dest => dest.JobWorkerRate,
                opt => opt.MapFrom(src => (float)src.JobWorkerPrice)) // Cast to float if necessary
            .ForMember(dest => dest.FinalRate,
                opt => opt.MapFrom(src => (float)src.FinalRate)); // Cast to float if necessary
    }
}