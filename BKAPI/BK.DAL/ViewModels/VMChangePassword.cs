using System.ComponentModel.DataAnnotations;

namespace BK.DAL.ViewModels;

public class VMChangePassword
{
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}