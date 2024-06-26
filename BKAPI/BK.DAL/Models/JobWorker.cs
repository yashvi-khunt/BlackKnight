using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class JobWorker
{
    public int Id { get; set; }

    [ForeignKey("UserId")] 
    public string UserId { get; set; }
    
    public double FluteRate { get; set; }
    public double? LinerRate { get; set; }
    
    public virtual ApplicationUser User { get; set; }
}