using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ILogger = Serilog.ILogger;

namespace BKAPI.Controllers;


[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger _logger;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserController(IUserService userService, ILogger logger,UserManager<ApplicationUser> userManager)
    {
        _userService = userService;
        _logger = logger;
        _userManager = userManager;
    }

    [HttpGet("Get-all-clients")]
    public async Task<ActionResult<VMGetAll<VMAddClient>>> GetAllClients()
    {
        try
        {
            var result = await _userService.GetAllClients();
            return Ok(new Response<VMGetAll<VMAddClient>>(result,true,"Clients loaded successfully!"));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while getting clients.");
            return StatusCode(500, new Response("An error occurred while processing your request.", false));
        }
    }

    [HttpGet("Get-client/{uname}")]
    public async Task<ActionResult<VMAddClient>> GetClientByUsername(string uname)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(uname);
            if (user == null)
            {
                _logger.Warning("Client with username {Username} not found.", uname);
                return NotFound(new Response("Client not found.", false));
            }

            var data = await _userService.GetClientById(uname);
            _logger.Information("Client with username {Username} loaded successfully.", uname);
            return Ok(new Response<VMAddClient>(data, true, "Client loaded successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while getting client with username {Username}.", uname);
            return StatusCode(500, new Response("An error occurred while processing your request.", false));
        }
    }

    [HttpPut("Update-admin")]
    public async Task<IActionResult> UpdateAdmin([FromBody] VMUpdateAdmin updateAdmin)
    {
        var user = await _userManager.GetUserAsync(User);
        try
        {
            if (user == null)
            {
                _logger.Error("Admin not found.");
                return NotFound(new Response("Admin not found.", false));
            }

            await _userService.UpdateAdmin(user.Id,updateAdmin);
            
            _logger.Information($"Admin updated successfully with ID: {user.Id}");
            return StatusCode(200,new Response("Admin updated successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while updating the admin with ID: {Id}", user?.Id);
            
            return StatusCode(500, new Response("Internal server error",false));
        }
    }

    [HttpPost("Add-client")]
    public async Task<IActionResult> AddClient([FromBody] VMAddClient addClient)
    {
        _logger.Information("AddClient action called with CompanyName: {CompanyName}", addClient.CompanyName);

        try
        {
            var client = await _userService.AddClient(addClient);
            if (client == null)
            {
                _logger.Warning("Failed to add client for CompanyName: {CompanyName}", addClient.CompanyName);
                return BadRequest(new Response("Failed to add client",false));
            }

            _logger.Information("Client added successfully with ID: {ClientId}", client.Id);
            return Ok(new Response<ApplicationUser>(client,true,"Client added successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while adding a client for CompanyName: {CompanyName}", addClient
                .CompanyName);
            return StatusCode(500, new Response("Internal server error",false));
        }
    }
}