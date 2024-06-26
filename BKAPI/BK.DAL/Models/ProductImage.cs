using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class ProductImage
{
    public int Id { get; set; }
    [ForeignKey("ProductId")]
    public int ProductId { get; set; }
    public string ImagePath { get; set; }
    public bool IsPrimary { get; set; }
    
    public virtual Product Product { get; set; }
}