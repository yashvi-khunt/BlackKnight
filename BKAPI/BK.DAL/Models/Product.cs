using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class Product
{
    public int Id { get; set; }
    public string BoxName { get; set; }
    [ForeignKey("BrandId")]
    public int BrandId { get; set; }
    [ForeignKey("TopPaperTypeId")]
    public int TopPaperTypeId { get; set; }
    [ForeignKey("FlutePaperTypeId")]
    public int FlutePaperTypeId { get; set; }
    [ForeignKey("BackPaperTypeId")]
    public int BackPaperTypeId { get; set; }
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
    public int NoOfSheetPerBox { get; set; }
    [ForeignKey("PrintTypeId")]
    public int PrintTypeId { get; set; }
    public string? PrintingPlate { get; set; }
    public int Ply { get; set; }
    public double PrintRate { get; set; }
    public bool IsLamination { get; set; }
    public int? DieCode { get; set; }
    [ForeignKey("JobWorkerId")]
    public int JobWorkerId { get; set; }
    [ForeignKey("LinerJobWorkerId")]
    public int? LinerJobWorkerId { get; set; }
    public double ProfitPercent { get; set; }
    public string? Remarks { get; set; }
    public int SerialNumber { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsActive { get; set; }
    
    public virtual Brand Brand { get; set; }
    public virtual PaperType TopPaperType { get; set; }
    public virtual PaperType FlutePaperType { get; set; }
    public virtual PaperType BackPaperType { get; set; }
    public virtual PrintType PrintType { get; set; }
    public virtual JobWorker JobWorker { get; set; }
    public virtual JobWorker LinerJobWorker { get; set; }
}