using System.ComponentModel.DataAnnotations;

namespace BK.DAL.ViewModels;

public class VMUpdateAdmin
{
    public string? UserName { get; set; }
    public string? UserPassword { get; set; }
    public string? PhoneNumber { get; set; }
    
    public string? GSTNumber { get; set; }
}