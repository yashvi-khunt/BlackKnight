using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class Order
{
    public int Id { get; set; }
    [ForeignKey("ClientId")]
    public string ClientId { get; set; }
    [ForeignKey("ProductId")]
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public DateTime OrderDate { get; set; }
    public float JobWorkerRate { get; set; }
    public float FinalRate { get; set; }
    
    public virtual ApplicationUser Client { get; set; }
    public virtual Product Product { get; set; }
}