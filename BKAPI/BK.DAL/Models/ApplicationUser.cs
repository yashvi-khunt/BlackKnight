using Microsoft.AspNetCore.Identity;

namespace BK.DAL.Models;

public class ApplicationUser : IdentityUser
{
    public string CompanyName { get; set; }
    public string UserPassword { get; set; }
    public string? GSTNumber { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsActivated { get; set; }

    public virtual List<JobWorker> JobWorkers { get; set; }
}