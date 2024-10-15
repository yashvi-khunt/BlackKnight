using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BK.BLL.Services;

public class DeviceService : IDeviceService
{
    private readonly ApplicationDbContext _context;

    public DeviceService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task RegisterDeviceAsync(Device device)
    {
        _context.Devices.Add(device);
        await _context.SaveChangesAsync();
    }

    public async Task<Device> GetDeviceByTokenAsync(string token)
    {
        return await _context.Devices.FirstOrDefaultAsync(d => d.DeviceToken == token);
    }

    public async Task RemoveDeviceAsync(Device device)
    {
        _context.Devices.Remove(device);
        await _context.SaveChangesAsync();
    }
}