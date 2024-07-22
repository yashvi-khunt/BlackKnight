namespace BK.DAL.ViewModels;

public class VMUpdateProduct
{
    public string? BoxName { get; set; }
    public int? BrandId { get; set; }
    public int? TopPaperTypeId { get; set; }
    public int? FlutePaperTypeId { get; set; }
    public int? BackPaperTypeId { get; set; }
    public double? Length { get; set; }
    public double? Width { get; set; }
    public double? Height { get; set; }
    public double? Flap1 { get; set; }
    public double? Flat2 { get; set; }
    public double? Deckle { get; set; }
    public double? Cutting { get; set; }
    public int? Top { get; set; }
    public int? Flute { get; set; }
    public int? Back { get; set; }
    public int? NoOfSheerPerBox { get; set; }
    public int? PrintTypeId { get; set; }
    public string? PrintingPlate { get; set; }
    public int? Ply { get; set; }
    public double? PrintRate { get; set; }
    public bool? IsLamination { get; set; }
    public int? DieCode { get; set; }
    public int? JobWorkerId { get; set; }
    public int? LinerJobWorkerId { get; set; }
    public double? ProfitPercent { get; set; }
    public string? Remarks { get; set; }
    public bool? IsActive { get; set; }
}
