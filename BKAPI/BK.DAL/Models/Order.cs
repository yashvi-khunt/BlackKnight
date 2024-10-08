using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class Order
{
    public int Id { get; set; }
        
    // Existing fields
    [ForeignKey("ProductId")]
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public DateTime OrderDate { get; set; }
    public float JobWorkerRate { get; set; }
    public float FinalRate { get; set; }
    public bool IsCompleted { get; set; }
        
    // Product Details
    public string BrandName { get; set; }
    public string ClientId { get; set; }
    public int JobWorkerId { get; set; }
    public double ProfitPercent { get; set; }
    public int? LinerJobworkerId { get; set; }
        
    // Specifications
    public string TopPaperTypeName { get; set; }
    public string FlutePaperTypeName { get; set; }
    public string BackPaperTypeName { get; set; }
    public int Top { get; set; }
    public int Flute { get; set; }
    public int Back { get; set; }
    public int Ply { get; set; }
    public double NoOfSheetPerBox { get; set; }
    public int? DieCode { get; set; }
    public string PrintTypeName { get; set; }
    public string PrintingPlate { get; set; }
        
    // Price Breakup
    public double TopPrice { get; set; }
    public double FlutePrice { get; set; }
    public double BackPrice { get; set; }
    public double PrintRate { get; set; }
    public double? LaminationPrice { get; set; }

    // Navigation properties
    public virtual Product Product { get; set; }
}
