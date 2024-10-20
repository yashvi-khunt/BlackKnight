using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class Notification
{
    public int NotificationId { get; set; }
    [ForeignKey("UserId")]
    public string UserId { get; set; }
    public string Heading { get; set; }
    public string Body { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsRead { get; set; } = false;
    
    public virtual ApplicationUser User { get; set; }
}