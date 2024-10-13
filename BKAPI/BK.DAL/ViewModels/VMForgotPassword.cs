using System.ComponentModel.DataAnnotations;

namespace BK.DAL.ViewModels;

public class VMForgotPassword
{
     
    [Required(ErrorMessage = "Username is required")]
    public string UserName { get; set; }

}