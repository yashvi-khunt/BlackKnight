using AutoMapper;
using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ILogger = Serilog.ILogger;

namespace BKAPI.Controllers;


[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger _logger;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserController(IUserService userService, ILogger logger, UserManager<ApplicationUser> userManager)
    {
        _userService = userService;
        _logger = logger;
        _userManager = userManager;
    }

    [HttpGet("Get-all-clients")]
    public async Task<ActionResult<VMGetAll<VMClientDetails>>> GetAllClients([FromQuery] string? search = null, [FromQuery] string? field = "ClientName", [FromQuery] string? sort = "asc", [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var result = await _userService.GetAllClients(search, field, sort, page, pageSize);
            return Ok(new Response<VMGetAll<VMClientDetails>>(result, true, "Clients loaded successfully!"));
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

            await _userService.UpdateAdmin(user.Id, updateAdmin);

            _logger.Information($"Admin updated successfully with ID: {user.Id}");
            return StatusCode(200, new Response("Admin updated successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while updating the admin with ID: {Id}", user?.Id);

            return StatusCode(500, new Response("Internal server error", false));
        }
    }
    
    [Authorize(Roles = "Admin,Client,JobWorker")]
    [HttpGet("Profile")]
    public async Task<IActionResult> GetProfileDetails()
    {
        var userId = _userManager.GetUserId(User);
        var user = await _userManager.FindByIdAsync(userId);
            
        if (user == null)
        {
            return NotFound("User not found");
        }

        if (await _userManager.IsInRoleAsync(user, "Admin"))
        {
            var adminDetails = await _userService.GetAdminDetails(userId);
            return Ok(new {profile=adminDetails,userRole = "Admin"});
        }
        else if (await _userManager.IsInRoleAsync(user, "Client"))
        {
            var clientDetails = await _userService.GetClientById(user.UserName);
            return Ok(new {profile=clientDetails,userRole = "Client"});
        }
        else if (await _userManager.IsInRoleAsync(user, "JobWorker "))
        {
            var jobworkerDetails = await _userService.GetJobworkerById(user.UserName);
            return Ok(new {profile=jobworkerDetails,userRole = "JobWorker"});
        }

        return Unauthorized("User role not recognized");
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
                return BadRequest(new Response("Failed to add client", false));
            }

            _logger.Information("Client added successfully with ID: {ClientId}", client.Id);
            return Ok(new Response("Client added successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while adding a client for CompanyName: {CompanyName}", addClient
                .CompanyName);
            return StatusCode(500, new Response("Internal server error", false));
        }
    }

    [HttpPut("Update-client/{id}")]
    public async Task<IActionResult> UpdateClient(string id, [FromBody] VMUpdateClient updateClient)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                _logger.Error("Client not found with ID: {Id}", id);
                return NotFound(new Response("Client not found.", false));
            }

            await _userService.UpdateClient(id, updateClient);

            _logger.Information("Client updated successfully with ID: {Id}", id);
            return Ok(new Response("Client updated successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while updating the client with ID: {Id}", id);
            return StatusCode(500, new Response("Internal server error.", false));
        }
    }

    [HttpPost("Add-jobworker")]
    public async Task<IActionResult> AddJobworker([FromBody] VMAddJobworker addJobworker)
    {
        _logger.Information("AddJobworker action called with CompanyName: {CompanyName}", addJobworker.CompanyName);

        try
        {
            var jobworker = await _userService.AddJobworker(addJobworker);
            if (jobworker == null)
            {
                _logger.Warning("Failed to add jobworker for CompanyName: {CompanyName}", addJobworker.CompanyName);
                return BadRequest(new Response("Failed to add jobworker", false));
            }

            _logger.Information("Jobworker added successfully with ID: {JobworkerId}", jobworker.Id);
            return Ok(new Response("Jobworker added successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while adding a jobworker for CompanyName: {CompanyName}",
                addJobworker.CompanyName);
            return StatusCode(500, new Response("Internal server error", false));
        }
    }

    [HttpPut("Update-jobworker/{id}")]
    public async Task<IActionResult> UpdateJobworker(string id, [FromBody] VMUpdateJobworker updateJobworker)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                _logger.Error("Jobworker not found with ID: {Id}", id);
                return NotFound(new Response("Jobworker not found.", false));
            }

            await _userService.UpdateJobworker(id, updateJobworker);

            _logger.Information("Jobworker updated successfully with ID: {Id}", id);
            return Ok(new Response("Jobworker updated successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while updating the jobworker with ID: {Id}", id);
            return StatusCode(500, new Response("Internal server error.", false));
        }
    }

    [HttpGet("Get-all-jobworkers")]
    public async Task<ActionResult<VMGetAll<VMJobworkerDetails>>> GetAllJobworkers([FromQuery] string? search = null, [FromQuery] string? field = "ClientName", [FromQuery] string? sort = "asc", [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var result = await _userService.GetAllJobworkers(search, field, sort, page, pageSize);
            return Ok(new Response<VMGetAll<VMJobworkerDetails>>(result, true, "Jobworkers loaded successfully!"));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while getting jobworkers.");
            return StatusCode(500, new Response("An error occurred while processing your request.", false));
        }
    }

    [HttpGet("Get-jobworker/{uname}")]
    public async Task<ActionResult<VMAddJobworker>> GetJobworkerByUsername(string uname)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(uname);
            if (user == null)
            {
                _logger.Warning("Jobworker with username {Username} not found.", uname);
                return NotFound(new Response("Jobworker not found.", false));
            }

            var data = await _userService.GetJobworkerById(uname);
            _logger.Information("Jobworker with username {Username} loaded successfully.", uname);
            return Ok(new Response<VMAddJobworker>(data, true, "Jobworker loaded successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while getting jobworker with username {Username}.", uname);
            return StatusCode(500, new Response("An error occurred while processing your request.", false));
        }
    }

    [HttpGet("Get-client-options")]
    public async Task<ActionResult<List<VMOptions>>> GetClientOptions()
    {
        try
        {
            var options = await _userService.GetClientOptions();
            return Ok(new Response<List<VMOptions>>(options, true, "Client options loaded successfully!"));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while getting client options.");
            return StatusCode(500, new Response("An error occurred while processing your request.", false));
        }
    }

    [HttpGet("Get-jobworker-options")]
    public async Task<ActionResult<List<VMOptions>>> GetJobworkerOptions()
    {
        try
        {
            var options = await _userService.GetJobworkerOptions();
            return Ok(new Response<List<VMOptions>>(options, true, "Jobworker options loaded successfully!"));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while getting jobworker options.");
            return StatusCode(500, new Response("An error occurred while processing your request.", false));
        }
    }
}