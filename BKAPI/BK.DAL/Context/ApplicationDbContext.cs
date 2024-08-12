using BK.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BK.DAL.Context;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<Brand> Brands { get; set; }
    public DbSet<JobWorker> JobWorkers { get; set; }
    public DbSet<Liner> Liners { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<PaperType> PaperTypes { get; set; }
    public DbSet<PrintType> PrintTypes { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductImage> Images { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //Seed Roles
        var adminRole = new IdentityRole{Name = "Admin",NormalizedName = "ADMIN"};

        // Add normalised name in migrations
        builder.Entity<IdentityRole>().HasData(
            adminRole,
            new IdentityRole { Name = "Client", NormalizedName = "CLIENT"},
            new IdentityRole { Name = "JobWorker",NormalizedName = "JOBWORKER"}
        );

        //a hasher to hash the password before seeding the user to the db
        var hasher = new PasswordHasher<IdentityUser>();


        //Seeding the User to AspNetUsers table
        var admin = new ApplicationUser()
        {
            Id = Guid.NewGuid().ToString(),
            UserName = "admin",
            NormalizedUserName = "ADMIN",
            PasswordHash = hasher.HashPassword(null, "Admin@123"),
            IsActivated = true,
            CreatedDate = DateTime.Now,
            CompanyName = "Black Knight Enterprise",
            UserPassword = "Admin@123",
        };
        builder.Entity<ApplicationUser>().HasData(admin);

        builder.Entity<PrintType>().HasData(
            new PrintType {Id = 1,Name = "2 CLR", IsOffset = false},
            new PrintType{Id = 2,Name = "2 CLR", IsOffset = true},
            new PrintType{Id = 3,Name = "4 CLR", IsOffset = false},
            new PrintType{Id = 4,Name = "4 CLR", IsOffset = true});


         //Seeding the relation between our user and role to AspNetUserRoles table
        builder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string>
            {
                RoleId = adminRole.Id,
                UserId = admin.Id
            }
        );
    }
}


internal class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    ApplicationDbContext IDesignTimeDbContextFactory<ApplicationDbContext>.CreateDbContext(string[] args)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
        var connectionString = configuration.GetConnectionString("Default");

        builder.UseMySQL(connectionString);

        return new ApplicationDbContext(builder.Options);
    }
}
