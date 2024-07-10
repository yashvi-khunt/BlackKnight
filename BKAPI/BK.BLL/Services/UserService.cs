using AutoMapper;
using Azure;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace BK.BLL.Services;


public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UserService(UserManager<ApplicationUser> userManager, ApplicationDbContext context,IMapper mapper)
    {
        _userManager = userManager;
        _context = context;
        _mapper = mapper;
    }
    
    public async Task UpdateAdmin(string id,VMUpdateAdmin updateAdmin)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user != null)
        {
            user.UserName = updateAdmin.UserName ?? user.UserName;
            if (updateAdmin.UserPassword != null)
            {
                user.UserPassword = updateAdmin.UserPassword;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, updateAdmin.UserPassword);
            }

            user.PhoneNumber = updateAdmin.PhoneNumber ?? user.PhoneNumber;
            user.GSTNumber = updateAdmin.GSTNumber ?? user.GSTNumber;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception("Failed to update admin");
            }
        }
        else
        {
            throw new Exception("Admin not found");
        }
    }

    public async Task<ApplicationUser> AddClient(VMAddClient addClient)
    {
        var newClient = new ApplicationUser
        {
            CompanyName = addClient.CompanyName,
            CreatedDate = DateTime.Now,
            UserName = addClient.UserName,
            UserPassword = addClient.UserPassword,
            PhoneNumber = addClient.PhoneNumber,
            GSTNumber = addClient.GSTNumber ?? null
        };

        var result = await _userManager.CreateAsync(newClient, addClient.UserPassword);

        if (!result.Succeeded)
            return null;
        await _userManager.AddToRoleAsync(newClient, "Client");
        return newClient;
    }

    public async Task UpdateClient(string id,VMUpdateClient updateClient)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user != null)
        {
            user.CompanyName = updateClient.CompanyName ?? user.CompanyName;
            user.UserName = updateClient.UserName ?? user.UserName;
            if (updateClient.UserPassword != null)
            {
                user.UserPassword = updateClient.UserPassword;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user,updateClient.UserPassword);
            }

            user.PhoneNumber = updateClient.PhoneNumber ?? user.PhoneNumber;
            user.GSTNumber = updateClient.GSTNumber ?? user.GSTNumber;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception("Failed to update client");
            }
        }
        else
        {
            throw new Exception("Client not found");
        }
    }

    public async Task<VMGetAll<VMAddClient>> GetAllClients()
    {
        var clients = await _userManager.GetUsersInRoleAsync("Client");
        var vmClients = _mapper.Map<List<VMAddClient>>(clients);
        var obj = new VMGetAll<VMAddClient>
        {
            Count = clients.Count,
            Data = vmClients,
        };
        return obj;
    }

    public async Task<VMAddClient> GetClientById(string uname)
    {
        var client = await _userManager.FindByNameAsync(uname);
        var vmClient = _mapper.Map<VMAddClient>(client);
        return vmClient;
    }

    public Task AddJobworker()
    {
        throw new NotImplementedException();
    }

    public Task UpdateJobworker()
    {
        throw new NotImplementedException();
    }

    public Task GetAllJobworkers()
    {
        throw new NotImplementedException();
    }

    public Task GetJobworkerById(int id)
    {
        throw new NotImplementedException();
    }
}