using AutoMapper;
using BK.DAL.Models;
using BK.DAL.ViewModels;

namespace BK.BLL.Helper;

public class TopPriceResolver : IValueResolver<Product, VMProductDetails, double>
{
    public double Resolve(Product src, VMProductDetails dest, double destMember, ResolutionContext context)
    {
        var DCN = src.Deckle * src.Cutting * src.NoOfSheetPerBox;
        return DCN * src.Top * src.TopPaperType.Price / (1550 * 1000);
    }
}

public class FlutePriceResolver : IValueResolver<Product, VMProductDetails, double>
{
    public double Resolve(Product src, VMProductDetails dest, double destMember, ResolutionContext context)
    {
        var DCN = src.Deckle * src.Cutting * src.NoOfSheetPerBox; 
        var NumberOfFluteSheets = src.Ply / 2;
        
        return DCN * src.Flute * src.FlutePaperType.Price * NumberOfFluteSheets * src.JobWorker.FluteRate /
               (1550 * 1000);
    }
}

public class BackPriceResolver : IValueResolver<Product, VMProductDetails, double>
{
    public double Resolve(Product src, VMProductDetails dest, double destMember, ResolutionContext context)
    {
        var DCN = src.Deckle * src.Cutting * src.NoOfSheetPerBox;
        var NumberOfBackSheets = src.Ply / 2;
        return DCN * src.Back * src.BackPaperType.Price * NumberOfBackSheets / (1550 * 1000);
    }
}

public class LaminationPriceResolver : IValueResolver<Product, VMProductDetails, double?>
{
    public double? Resolve(Product src, VMProductDetails dest, double? destMember, ResolutionContext context)
    {
        if (!src.IsLamination) return null;
        var DCN = src.Deckle * src.Cutting * src.NoOfSheetPerBox;
        return DCN * src.TopPaperType.LaminationPercent / 100;
    }
}

public class JobWorkerPriceResolver : IValueResolver<Product, VMProductDetails, double>
{
    public double Resolve(Product src, VMProductDetails dest, double destMember, ResolutionContext context)
    {
        double? laminationPrice = dest.LaminationPrice ?? 0;
        return (double)(dest.TopPrice + dest.FlutePrice + dest.BackPrice + src.PrintRate + laminationPrice);
    }
}

public class FinalRateResolver : IValueResolver<Product, VMProductDetails, double>
{
    public double Resolve(Product src, VMProductDetails dest, double destMember, ResolutionContext context)
    {
        var jobWorkerPrice = dest.JobWorkerPrice;
        var profit = dest.ProfitPercent / 100;
        var finalRate = jobWorkerPrice + jobWorkerPrice * profit;
        return Math.Round(finalRate, 1);
    }
}