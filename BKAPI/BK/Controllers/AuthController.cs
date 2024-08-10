using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BK.BLL.Helper;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ILogger = Serilog.ILogger;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace BKAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger _logger;

    public AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration,
        ILogger logger)
    {
        _userManager = userManager;
        _configuration = configuration;
        _logger = logger;
    }
    
    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] VMLogin model)
    {
        _logger.Information("Login attempt for user {UserName}", model.UserName);
        
        var user = await _userManager.FindByNameAsync(model.UserName);

        if (user == null)
        {
            _logger.Warning("Login failed for user {UserName}: user not found", model.UserName);
            return StatusCode(StatusCodes.Status401Unauthorized, new Response("Username or Password is incorrect", false));
        }

        if (!await _userManager.CheckPasswordAsync(user, model.Password))
        {
            _logger.Warning("Login failed for user {UserName}: incorrect password", model.UserName);
            return StatusCode(StatusCodes.Status401Unauthorized, new Response("Username or Password is incorrect", false));
        }
        
        var userRole = await _userManager.GetRolesAsync(user);

        var token = GenerateJwtToken(user, userRole);
        
        _logger.Information("User {UserName} logged in successfully", model.UserName);
        return StatusCode(200, new Response<string>(token, true, "Logged in successfully!"));
    }

    [Authorize]
    [HttpPut("Change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] VMChangePassword model)
    {
        _logger.Information("ChangePassword attempt for user {UserName}", User.Identity.Name);
        
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
                    _logger.Information("Password changed successfully for user {UserName}", user.UserName);
                    return Ok(new Response("Password Changed successfully."));
                }
                else
                {
                    _logger.Error("Error changing password for user {UserName}", user.UserName);
                    return StatusCode(500, "Something went wrong.");
                }

            }
            _logger.Error("User not found while changing password for {UserName}", User.Identity.Name);
            return StatusCode(500, new Response("Something went wrong.", false));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Exception occurred while changing password for user {UserName}", User.Identity.Name);
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
        };

        foreach (var role in userRole)
        {
            authClaims.Add(new Claim(ClaimTypes.Role,role));
        }

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddMonths(Convert.ToInt16(_configuration["JWT:TokenValidityInMonths"])),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}