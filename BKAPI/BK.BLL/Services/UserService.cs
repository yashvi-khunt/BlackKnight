using AutoMapper;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BK.BLL.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UserService(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IMapper mapper)
    {
        _userManager = userManager;
        _context = context;
        _mapper = mapper;
    }

    public async Task UpdateAdmin(string id, VMUpdateAdmin updateAdmin)
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
            if (!result.Succeeded) throw new Exception("Failed to update admin");
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

        // Add default brand name "Others" for the new client
        var defaultBrand = new Brand
        {
            ClientId = newClient.Id,
            Name = "Others"
        };

        _context.Brands.Add(defaultBrand);
        await _context.SaveChangesAsync();

        return newClient;
    }

    public async Task<List<VMOptions>> GetClientOptions()
    {
        var clients = await _userManager.GetUsersInRoleAsync("Client");
        var clientOptions = clients.Select(client => new VMOptions
        {
            Value = client.Id,
            Label = client.CompanyName
        }).ToList();

        return clientOptions;
    }

    public async Task<List<VMOptions>> GetJobworkerOptions()
    {
        var jobworkers = await _context.JobWorkers.Include(j => j.User).ToListAsync();
        var jobworkerOptions = jobworkers.Select(jobworker => new VMOptions
        {
            Value = jobworker.Id.ToString(),
            Label = jobworker.User.CompanyName
        }).ToList();

        return jobworkerOptions;
    }

    public async Task UpdateClient(string id, VMUpdateClient updateClient)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user != null)
        {
            user.CompanyName = updateClient.CompanyName ?? user.CompanyName;
            user.UserName = updateClient.UserName ?? user.UserName;
            if (updateClient.UserPassword != null)
            {
                user.UserPassword = updateClient.UserPassword;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, updateClient.UserPassword);
            }

            user.PhoneNumber = updateClient.PhoneNumber ?? user.PhoneNumber;
            user.GSTNumber = updateClient.GSTNumber ?? user.GSTNumber;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded) throw new Exception("Failed to update client");
        }
        else
        {
            throw new Exception("Client not found");
        }
    }

    public async Task<VMGetAll<VMClientDetails>> GetAllClients()
    {
        var clients = await _userManager.GetUsersInRoleAsync("Client");
        var vmClients = clients.Select(client => new VMClientDetails
        {
            Id = client.Id,
            CompanyName = client.CompanyName,
            UserName = client.UserName,
            PhoneNumber = client.PhoneNumber,
            UserPassword = client.UserPassword,
            GSTNumber = client.GSTNumber
        }).ToList();

        var obj = new VMGetAll<VMClientDetails>
        {
            Count = clients.Count,
            Data = vmClients
        };
        return obj;
    }

    public async Task<VMAddClient> GetClientById(string uname)
    {
        var client = await _userManager.FindByNameAsync(uname);
        var vmClient = _mapper.Map<VMAddClient>(client);
        return vmClient;
    }

    public async Task<ApplicationUser> AddJobworker(VMAddJobworker addJobworker)
    {
        var newJobworker = new ApplicationUser
        {
            CompanyName = addJobworker.CompanyName,
            CreatedDate = DateTime.Now,
            UserName = addJobworker.UserName,
            UserPassword = addJobworker.UserPassword,
            PhoneNumber = addJobworker.PhoneNumber,
            GSTNumber = addJobworker.GSTNumber ?? null
        };

        var result = await _userManager.CreateAsync(newJobworker, addJobworker.UserPassword);

        if (!result.Succeeded)
            throw new Exception("Something went wrong while adding jobworker");

        await _userManager.AddToRoleAsync(newJobworker, "JobWorker");

        var jobWorkerDetails = new JobWorker
        {
            UserId = newJobworker.Id,
            FluteRate = addJobworker.FluteRate,
            LinerRate = addJobworker.LinerRate ?? null
        };

        _context.JobWorkers.Add(jobWorkerDetails);
        await _context.SaveChangesAsync();
        return newJobworker;
    }

    public async Task UpdateJobworker(string id, VMUpdateJobworker updateJobworker)
    {
        var user = await _userManager.FindByIdAsync(id);
        var jobWorker = await _context.JobWorkers.FirstOrDefaultAsync(j => user != null && j.UserId == user.Id);

        if (user != null && jobWorker != null)
        {
            user.CompanyName = updateJobworker.CompanyName ?? user.CompanyName;
            user.UserName = updateJobworker.UserName ?? user.UserName;
            if (updateJobworker.UserPassword != null)
            {
                user.UserPassword = updateJobworker.UserPassword;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, updateJobworker.UserPassword);
            }

            user.PhoneNumber = updateJobworker.PhoneNumber ?? user.PhoneNumber;
            user.GSTNumber = updateJobworker.GSTNumber ?? user.GSTNumber;


            jobWorker.FluteRate = updateJobworker.FluteRate ?? jobWorker.FluteRate;
            jobWorker.LinerRate = updateJobworker.LinerRate ?? jobWorker.LinerRate;


            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded) throw new Exception("Failed to update job worker");

            await _context.SaveChangesAsync();
        }
        else
        {
            throw new Exception("Job worker not found");
        }
    }

    public async Task<VMGetAll<VMJobworkerDetails>> GetAllJobworkers()
    {
        var jobworkers = await _userManager.GetUsersInRoleAsync("JobWorker");
        var vmJobworkers = new List<VMJobworkerDetails>();

        foreach (var jobworker in jobworkers)
        {
            var jw = await _context.JobWorkers.Include(u => u.User).FirstOrDefaultAsync(jw => jw.UserId == jobworker.Id);
            var vmJobworker = _mapper.Map<VMJobworkerDetails>(jw);
            vmJobworkers.Add(vmJobworker);
        }
        
        var obj = new VMGetAll<VMJobworkerDetails>
        {
            Count = jobworkers.Count,
            Data = vmJobworkers,
        };
        return obj;
    }
    public async Task<VMAddJobworker> GetJobworkerById(string uname)
    {
        var jobworker = await _userManager.FindByNameAsync(uname);
        var jw = await _context.JobWorkers.Include(j => j.User).FirstOrDefaultAsync(u => u.UserId == jobworker.Id);
        var vmJobworker = _mapper.Map<VMAddJobworker>(jw);
        return vmJobworker;
    }
}