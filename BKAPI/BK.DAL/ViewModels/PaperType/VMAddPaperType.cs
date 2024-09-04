using System.ComponentModel.DataAnnotations;

namespace BK.DAL.ViewModels.PaperType;

public class VMAddPaperType
{
    [Required]
    public string Type { get; set; }
    [Required]
    public string BF { get; set; }
    [Required]
    public double Price { get; set; }
    public double LaminationPercent { get; set; }
}