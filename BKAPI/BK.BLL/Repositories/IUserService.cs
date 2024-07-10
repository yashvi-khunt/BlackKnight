using BK.BLL.Helper;
using BK.DAL.Models;
using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IUserService
{
    Task UpdateAdmin(string id,VMUpdateAdmin updateAdmin);
    
    Task<ApplicationUser> AddClient(VMAddClient addClient);
    Task UpdateClient(string id,VMUpdateClient updateClient);
    Task<VMGetAll<VMAddClient>> GetAllClients();
    Task<VMAddClient> GetClientById(string uname);
    Task AddJobworker();
    Task UpdateJobworker();
    Task GetAllJobworkers();
    Task GetJobworkerById(int id);

}