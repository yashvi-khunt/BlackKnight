using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ILogger = Serilog.ILogger;

namespace BKAPI.Controllers;

[ApiController]
public class NotificationController : ControllerBase
{
    
    private readonly ILogger _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IDeviceService _deviceService;
    private readonly ApplicationDbContext _context;

    public NotificationController(ILogger logger, UserManager<ApplicationUser> userManager, IDeviceService deviceService)
    {
        _logger = logger;
        _userManager = userManager;
        _deviceService = deviceService;
    }
    
    [Authorize]
    [HttpPost("RegisterDevice")]
    public async Task<IActionResult> RegisterDevice([FromBody] VMDeviceRegistration model)
    {
        _logger.Information("Device registration attempt for user {UserName}", User.Identity.Name);

        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            _logger.Warning("Device registration failed for user {UserName}: user not found", User.Identity.Name);
            return StatusCode(StatusCodes.Status401Unauthorized, new Response("Unauthorized", false));
        }

        var device = new Device
        {
            DeviceToken = model.DeviceToken,
            UserId = user.Id,
            RegisteredAt = DateTime.Now
        };

        var existingDevice = await _deviceService.GetDeviceByTokenAsync(model.DeviceToken);

        if (existingDevice != null)
        {
            // Update the existing device registration
            existingDevice.RegisteredAt = DateTime.Now;
            _context.Devices.Update(existingDevice);
        }
        else
        {
            // Register new device
            await _deviceService.RegisterDeviceAsync(device);
        }

        _logger.Information("Device registered successfully for user {UserName}", user.UserName);
        return Ok(new Response("Device registered successfully", true));
    }

}