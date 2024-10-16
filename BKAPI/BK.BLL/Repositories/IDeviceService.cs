using BK.DAL.Models;
using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IDeviceService
{
    Task RegisterDeviceAsync(Device device);
    Task<Device> GetDeviceByTokenAsync(string token);
    Task<IEnumerable<Device>> GetDevicesByUserIdAsync(string userId);
    Task RemoveDeviceAsync(Device device);
}