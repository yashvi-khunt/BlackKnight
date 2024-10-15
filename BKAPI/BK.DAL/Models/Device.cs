using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class Device
{
    public int Id { get; set; }
    public string DeviceToken { get; set; }
    public string Platform { get; set; } 
    [ForeignKey("UserId")] 
    public string UserId { get; set; } 
    public DateTime RegisteredAt { get; set; }
    
    public virtual ApplicationUser User { get; set; }
}