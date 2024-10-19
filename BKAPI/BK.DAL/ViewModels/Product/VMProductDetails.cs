namespace BK.DAL.ViewModels;

public class VMProductDetails
{
    public int Id { get; set; }
    public string BoxName { get; set; }
    public string BrandName { get; set; }
    public int BrandId { get; set; }

    public string ClientName { get; set; }
    public string ClientId { get; set; }
    public int JobWorkerId { get; set; }
    public string JobWorkerName { get; set; }
    public double ProfitPercent { get; set; }
    public int? LinerJobworkerId { get; set; }
    public string? Remarks { get; set; }
    public List<VMAddProductImage>? Images { get; set; }
    
    //Specifications
    public double? Length { get; set; }
    public double? Width { get; set; }
    public double? Height { get; set; }
    public double? Flap1 { get; set; }
    public double? Flat2 { get; set; }
    public double Deckle { get; set; }
    public double Cutting { get; set; }
    public string TopPaperTypeName { get; set; }
    public int TopPaperTypeId { get; set; }
    public string FlutePaperTypeName { get; set; }
    public int FlutePaperTypeId { get; set; }
    public string BackPaperTypeName { get; set; }
    public int BackPaperTypeId { get; set; }
    public int Top { get; set; }
    public int Flute { get; set; }
    public int Back { get; set; }
    public int Ply { get; set; }
    public double NoOfSheetPerBox { get; set; }
    public bool IsLamination { get; set; }
    public string? DieCode { get; set; }
    public string? PrintTypeName { get; set; }
    public int? PrintTypeId { get; set; }
    public string PrintingPlate { get; set; }
    
    //price breakup
    public double TopPrice { get; set; }
    public double FlutePrice { get; set; }
    public double BackPrice { get; set; }
    public double PrintRate { get; set; }
    public double? LaminationPrice { get; set; }
    public double JobWorkerPrice { get; set; }
    public double FinalRate { get; set; }
}