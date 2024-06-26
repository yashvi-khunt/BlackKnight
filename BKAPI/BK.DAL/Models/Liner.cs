using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class Liner
{
    public int Id { get; set; }
    [ForeignKey("ProductId")]
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    
    public virtual Product Product { get; set; }
}