using System.ComponentModel.DataAnnotations;

namespace BK.DAL.ViewModels;

public class VMUpdateJobworker
{
    public string? CompanyName { get; set; }
    
    public string? UserName { get; set; }
    
    public string? UserPassword { get; set; }
    
    public string? PhoneNumber { get; set; }
    
    public string? GSTNumber { get; set; }
    
    public double? FluteRate { get; set; }
    public double? LinerRate { get; set; }
}