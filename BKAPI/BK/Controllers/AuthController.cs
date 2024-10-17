using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.Context;
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
    private readonly IEmailService _emailService;

    public AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration,
        ILogger logger, IEmailService service)
    {
        _userManager = userManager;
        _configuration = configuration;
        _logger = logger;
        _emailService = service;
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
                    return StatusCode(500,new Response( "Something went wrong.",false));
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
    
    
    [HttpPost("ForgotPassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] VMForgotPassword model)
    {
        _logger.Information("ForgotPassword request for username {UserName}", model.UserName);

        // Fetch user by username
        var user = await _userManager.FindByNameAsync(model.UserName);
        if (user == null) 
        {
            _logger.Warning("ForgotPassword failed: User not found for username {UserName}", model.UserName);
            return StatusCode(StatusCodes.Status202Accepted, new Response("If the username exists, you will receive a reset password link.", false));
        }

        try
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        
            // Reset link sent to the user's registered email
            var resetLink = $"http://api.synqron.in/auth/reset-password?userEmail={user.Email}&token={token}";

            var emailTemplate = EmailTemplate.PasswordResetMail(user.UserName, resetLink);

            MailRequest mailRequest = new MailRequest()
            {
                RecipientEmail = user.Email,  // Send to user's email
                Subject = "Password Reset Mail",
                Body = emailTemplate,
            };

            // Assuming you have an IEmailService to send emails.
            await _emailService.SendEmailAsync(mailRequest);

            _logger.Information("Password reset email sent to {Email} for username {UserName}", user.Email, model.UserName);
            return Ok(new Response("Password reset email sent successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "Exception while processing ForgotPassword for username {UserName}", model.UserName);
            return StatusCode(StatusCodes.Status500InternalServerError, new Response("Something went wrong. Please try again.", false));
        }
    }


[HttpPost("ResetPassword")]
public async Task<IActionResult> ResetPassword([FromBody] VMResetPassword model)
{
    _logger.Information("ResetPassword attempt for email {Email}", model.Email);

    var user = await _userManager.FindByEmailAsync(model.Email);
    if (user == null) 
    {
        _logger.Warning("ResetPassword failed: User not found for email {Email}", model.Email);
        return StatusCode(StatusCodes.Status500InternalServerError, new Response("Invalid request.", false));
    }

    try
    {
        var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
        user.UserPassword = model.NewPassword;
         

        if (result.Succeeded)
        {
            await _userManager.UpdateAsync(user);
            _logger.Information("Password reset successfully for {Email}", model.Email);
            return Ok(new Response("Password reset successfully.", true));
        }
        else
        {
            var message = string.Join("; ", result.Errors.Select(e => e.Description));
            _logger.Warning("Password reset failed for {Email}: {ErrorMessage}", model.Email, message);
            return StatusCode(StatusCodes.Status500InternalServerError, new Response(message, false));
        }
    }
    catch (Exception ex)
    {
        _logger.Error(ex, "Exception while resetting password for {Email}", model.Email);
        return StatusCode(StatusCodes.Status500InternalServerError, new Response("Something went wrong. Please try again.", false));
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