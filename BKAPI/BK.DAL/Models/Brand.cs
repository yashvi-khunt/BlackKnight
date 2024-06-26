using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class Brand
{
    public int Id { get; set; }
    [ForeignKey("ClientId")]
    public string ClientId { get; set; }
    public string Name { get; set; }
    
    
    public virtual ApplicationUser Client { get; set; }
}