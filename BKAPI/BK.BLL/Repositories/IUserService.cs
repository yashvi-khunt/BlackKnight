using BK.BLL.Helper;
using BK.DAL.Models;
using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IUserService
{
    //admin methods
    Task UpdateAdmin(string id,VMUpdateAdmin updateAdmin);
    
    //client methods
    Task<ApplicationUser> AddClient(VMAddClient addClient);
    Task UpdateClient(string id,VMUpdateClient updateClient);
    Task<VMGetAll<VMClientDetails>> GetAllClients();
    Task<VMAddClient> GetClientById(string uname);
    
    //jobworker methods
    Task<ApplicationUser> AddJobworker(VMAddJobworker addJobworker);
    Task UpdateJobworker(string id, VMUpdateJobworker updateJobworker);
    Task<VMGetAll<VMJobworkerDetails>> GetAllJobworkers();
    Task<VMAddJobworker> GetJobworkerById(string uname);

    Task<List<VMOptions>> GetClientOptions();
    Task<List<VMOptions>> GetJobworkerOptions();

}