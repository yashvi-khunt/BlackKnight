using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BK.BLL.Helper;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace BKAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : Controller
{

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,
        ApplicationDbContext context, IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
        _configuration = configuration;
    }
    
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] VMLogin model)
    {
        var user = await _userManager.FindByNameAsync(model.UserName);

        if (user == null)
        {
            return StatusCode(StatusCodes.Status401Unauthorized, new Response("Username or Password is incorrect", false));
        }

        if (!await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return StatusCode(StatusCodes.Status401Unauthorized, new Response("Username or Password is incorrect", false));
        }
        
        var userRole = await _userManager.GetRolesAsync(user);

        var token = GenerateJwtToken(user, userRole);
        return StatusCode(200, new Response<string>(token, true, "Logged in successfully!"));
    }

    [Authorize]
    [HttpPut("ChangePassword")]
    public async Task<IActionResult> ChangePassword([FromBody] VMChangePassword model)
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user != null)
            {
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, model.Password);
                user.UserPassword = model.Password;
                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok(new Response("Password Changed successfully."));
                }
                else
                {
                    return StatusCode(500, "Something went wrong.");
                }

            }
            return StatusCode(500, new Response("Something went wrong.", false));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response(ex.Message, false));
        }
    }
    
    private string GenerateJwtToken(ApplicationUser user, IList<string> userRole)
    {
        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.GivenName,user.UserId)
        };

        foreach (var role in userRole)
        {
            authClaims.Add(new Claim(ClaimTypes.Role,role));
        }

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["JWT:TokenValidityInMinutes"])),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    
}