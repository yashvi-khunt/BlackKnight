using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ILogger = Serilog.ILogger;

namespace BKAPI.Controllers;
[Route("api")]
[ApiController]
public class NotificationController : ControllerBase
{
    
    private readonly ILogger _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IDeviceService _deviceService;
    private readonly ApplicationDbContext _context;

    public NotificationController(ILogger logger, UserManager<ApplicationUser> userManager, IDeviceService 
            deviceService,ApplicationDbContext context)
    {
        _logger = logger;
        _userManager = userManager;
        _deviceService = deviceService;
        _context = context;
    }
    
    [Authorize]
    [HttpPost("RegisterDevice")]
    public async Task<IActionResult> RegisterDevice([FromBody] VMDeviceRegistration model)
    {
        try
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
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred during device registration for user {UserName}", User.Identity.Name);
            return StatusCode(StatusCodes.Status500InternalServerError, new Response("An error occurred while registering the device", false));
        }
    }

    [HttpGet("Notification")]
    public async Task<IActionResult> GetNotificationsForUser()
    {
        var user = await _userManager.GetUserAsync(User);
        var notifications = await _context.Notifications
            .Where(n => n.UserId == user.Id && n.CreatedAt >= DateTime.UtcNow.AddDays(-15))
            .ToListAsync();

        return Ok(new Response<List<Notification>>(notifications));
    }

    [HttpPut("Notification/MarkAsRead/{id}")]
    public async Task<IActionResult> MarkNotificationAsRead(int id)
    {
        var notification = await _context.Notifications.FindAsync(id);
        if (notification == null)
        {
            return NotFound();
        }

        notification.IsRead = true;
        await _context.SaveChangesAsync();

        return Ok(new Response<Notification>(notification,true,"Notifications update successfully"));
    }

}