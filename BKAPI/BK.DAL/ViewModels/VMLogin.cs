using System.ComponentModel.DataAnnotations;

namespace BK.DAL.ViewModels;

public class VMLogin
{
    [Required(ErrorMessage = "Username is required.")]
    public string UserName { get; set; }
    
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}