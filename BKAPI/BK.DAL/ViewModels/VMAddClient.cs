using System.ComponentModel.DataAnnotations;

namespace BK.DAL.ViewModels;

public class VMAddClient
{
    [Required(ErrorMessage = "Company name is required.")]
    public string CompanyName { get; set; }
    
    [Required(ErrorMessage = "User name is required.")]
    public string UserName { get; set; }
    
    [Required(ErrorMessage = "Password is required.")]
    public string UserPassword { get; set; }
    
    [Required(ErrorMessage = "Mobile number is required.")]
    public string PhoneNumber { get; set; }
    
    public string? GSTNumber { get; set; }
    
}