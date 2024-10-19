namespace BK.DAL.ViewModels;

public class VMOrderDetails
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public DateTime OrderDate { get; set; }
    public float JobWorkerRate { get; set; }
    public float FinalRate { get; set; }
    public bool IsCompleted { get; set; }
    public List<VMAddProductImage>? Images { get; set; }
    
    public string BoxName { get; set; }

    public string BrandName { get; set; }

    public string TopPaperTypeName { get; set; }
   
    public string FlutePaperTypeName { get; set; }

    public string BackPaperTypeName { get; set; }
    public double? Length { get; set; }
    public double? Width { get; set; }
    public double? Height { get; set; }
    public double? Flap1 { get; set; }
    public double? Flat2 { get; set; }
    public double Deckle { get; set; }
    public double Cutting { get; set; }
    public int Top { get; set; }
    public int Flute { get; set; }
    public int Back { get; set; }
    public double NoOfSheetPerBox { get; set; }
   
    public string PrintTypeName { get; set; }
    public string? PrintingPlate { get; set; }
    public int Ply { get; set; }
    public double PrintRate { get; set; }
    public bool IsLamination { get; set; }
    public int? DieCode { get; set; }
  
    public string JobWorkerName { get; set; }
   
    public string? LinerJobWorkerName { get; set; }
    public double ProfitPercent { get; set; }
    public string? Remarks { get; set; }
    // Price Breakup
    public double TopPrice { get; set; }
    public double FlutePrice { get; set; }
    public double BackPrice { get; set; }
    public double? LaminationPrice { get; set; }
    
}