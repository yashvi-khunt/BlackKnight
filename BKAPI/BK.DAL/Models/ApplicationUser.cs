using Microsoft.AspNetCore.Identity;

namespace BK.DAL.Models;

public class ApplicationUser : IdentityUser
{
    public string CompanyName { get; set; }
    public string UserId { get; set; }
    public string UserPassword { get; set; }
    public string? WhatsappNumber { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsActivated { get; set; }
    
}