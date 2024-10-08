using AutoMapper;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace BK.BLL.Services;

public class OrderService : IOrderService
{
    private readonly IMapper _mapper;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public OrderService(IMapper mapper, ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _mapper = mapper;
        _context = context;
        _userManager = userManager;
    }

    public async Task AddOrder(VMAddOrder vmAddOrder)
    {
        var orders = _mapper.Map<List<Order>>(vmAddOrder.Orders);

        foreach (var order in orders)
        {
            order.OrderDate = DateTime.UtcNow; // Set the current date for each order
            order.IsCompleted = false; // Set default value for new orders
            _context.Set<Order>().Add(order);
        }

        await _context.SaveChangesAsync();
    }

    public Task UpdateOrder()
    {
        throw new NotImplementedException();
    }
    

    public async Task<VMGetAll<VMGetAllOrder>> GetAllOrders(DateTime? fromDate = null, DateTime? toDate = null,
        string? search = null, string? field = "clientName", string? sort = "asc", int page = 1, int pageSize = 10)
    {
        var ordersQuery = _context.Orders
            .Include(o => o.Product).ThenInclude(p => p.Brand).ThenInclude(b => b.Client)
            .Include(o => o.Product).ThenInclude(p => p.JobWorker).ThenInclude(j => j.User)
            .AsQueryable();

        // Date filtering
        if (fromDate.HasValue)
        {
            ordersQuery = ordersQuery.Where(o => o.OrderDate >= fromDate.Value);
        }

        if (toDate.HasValue)
        {
            ordersQuery = ordersQuery.Where(o => o.OrderDate <= toDate.Value);
        }

        // Search filtering
        if (!string.IsNullOrEmpty(search))
        {
            ordersQuery = ordersQuery.Where(o =>
                o.Product.Brand.Client.CompanyName.Contains(search) ||
                o.Product.JobWorker.User.UserName.Contains(search) ||
                o.Product.BoxName.Contains(search));
        }

        // Sorting
        ordersQuery = field switch
        {
            "orderDate" => sort == "asc"
                ? ordersQuery.OrderBy(o => o.OrderDate)
                : ordersQuery.OrderByDescending(o => o.OrderDate),
            "clientName" => sort == "asc"
                ? ordersQuery.OrderBy(o => o.Product.Brand.Client.CompanyName)
                : ordersQuery.OrderByDescending(o => o.Product.Brand.Client.CompanyName),
            "boxName" => sort == "asc"
                ? ordersQuery.OrderBy(o => o.Product.BoxName)
                : ordersQuery.OrderByDescending(o => o.Product.BoxName),
            "quantity" => sort == "asc"
                ? ordersQuery.OrderBy(o => o.Quantity)
                : ordersQuery.OrderByDescending(o => o.Quantity),
            "jobWorkerRate" => sort == "asc"
                ? ordersQuery.OrderBy(o => o.JobWorkerRate)
                : ordersQuery.OrderByDescending(o => o.JobWorkerRate),
            "profitPercent" => sort == "asc"
                ? ordersQuery.OrderBy(o => o.Product.ProfitPercent)
                : ordersQuery.OrderByDescending(o => o.Product.ProfitPercent),
            "finalRate" => sort == "asc"
                ? ordersQuery.OrderBy(o => o.FinalRate)
                : ordersQuery.OrderByDescending(o => o.FinalRate),
            _ => ordersQuery.OrderBy(o => o.OrderDate) // Default sorting by OrderDate
        };

        // Pagination
        var paginatedOrders = await ordersQuery
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var orderViewModels = _mapper.Map<List<VMGetAllOrder>>(paginatedOrders);

        return new VMGetAll<VMGetAllOrder>
        {
            Count = await ordersQuery.CountAsync(), // Total count after filtering
            Data = orderViewModels
        };
    }



    public async Task<VMOrderDetails> GetOrderById(int id)
    {
        var order = await _context.Orders
            .FirstOrDefaultAsync(o => o.Id == id);
        if (order == null)
        {
            return null;
        }

        var orderDetails = _mapper.Map<VMOrderDetails>(order);
        return orderDetails;
    }

    public async Task<VMOrderDashboard> GetOrderDashboardData(string userId)
    {
        // Fetch the user and their role
        var user = await _userManager.FindByIdAsync(userId);
        var userRoles = await _userManager.GetRolesAsync(user);

        // Fetch orders, products, and clients data
        var orders = await _context.Orders
            .Include(o => o.Product)
            .ThenInclude(p => p.Brand)
            .ThenInclude(b => b.Client)
            .Include(o => o.Product)
            .ThenInclude(p => p.Images)
            .Include(o => o.Product)
            .ThenInclude(p => p.JobWorker)
            .ThenInclude(j => j.User)
            .ToListAsync();
        var products = await _context.Products.ToListAsync();

        // Filter orders based on the user role
        if (userRoles.Contains("Client"))
        {
            // Filter orders for the specific client
            orders = orders.Where(o => o.Product.Brand.ClientId == userId).ToList();
        }
        else if (userRoles.Contains("JobWorker"))
        {
            // Filter orders for the specific job worker
            orders = orders.Where(o => o.Product.JobWorker.UserId == userId).ToList();
        }

        // Map the orders to ViewModel
        var orderViewModels = _mapper.Map<List<VMGetAllOrder>>(orders);

        // Segregate orders based on their status
        var pendingOrders = orderViewModels.Where(o => !o.IsCompleted).ToList();
        var completedOrders = orderViewModels.Where(o => o.IsCompleted).ToList();

        // Flash card data
        var flashCards = new List<VMFlashCard>();

        if (userRoles.Contains("Admin"))
        {
            // For Admin: pending orders, completed orders, total orders, total products, total clients
            var clients = await _userManager.GetUsersInRoleAsync("Client");
            flashCards = new List<VMFlashCard>
            {
                new VMFlashCard { Title = "Pending Orders", Count = pendingOrders.Count },
                new VMFlashCard { Title = "Completed Orders", Count = completedOrders.Count },
                new VMFlashCard { Title = "Total Orders", Count = orders.Count },
                new VMFlashCard { Title = "Total Products", Count = products.Count },
                new VMFlashCard { Title = "Total Clients", Count = clients.Count }
            };
        }
        else if (userRoles.Contains("Client"))
        {
            // For Clients: pending orders, completed orders, total orders, total products
            flashCards = new List<VMFlashCard>
            {
                new VMFlashCard { Title = "Pending Orders", Count = pendingOrders.Count },
                new VMFlashCard { Title = "Completed Orders", Count = completedOrders.Count },
                new VMFlashCard { Title = "Total Orders", Count = orders.Count },
                new VMFlashCard { Title = "Total Products", Count = products.Count }
            };
        }
        else if (userRoles.Contains("JobWorker"))
        {
            // For Job Workers: pending orders, completed orders, total orders
            flashCards = new List<VMFlashCard>
            {
                new VMFlashCard { Title = "Pending Orders", Count = pendingOrders.Count },
                new VMFlashCard { Title = "Completed Orders", Count = completedOrders.Count },
                new VMFlashCard { Title = "Total Orders", Count = orders.Count }
            };
        }

        // Construct the dashboard data response
        var dashboardData = new VMOrderDashboard
        {
            FlashCards = flashCards,
            Orders = new VMOrderData
            {
                Pending = pendingOrders,
                Completed = completedOrders
            }
        };

        return dashboardData;
    }



    public async Task AddOrderWithWishlist(string userId)
    {
        // Retrieve user's wishlist
        var wishlistItems = await _context.CartItems
            .Where(w => w.ClientId == userId)
            .Include(w => w.Product)
            .ThenInclude(p => p.Brand) // Include related Brand for BrandName
            .Include(w => w.Product.TopPaperType) // Include related TopPaperType
            .Include(w => w.Product.FlutePaperType) // Include related FlutePaperType
            .Include(w => w.Product.BackPaperType).Include(w => w.Product.PrintType) // Include related BackPaperType
            .Include(w => w.Product.JobWorker) // Include related JobWorker
            .ToListAsync();

        // Add wishlist items to the order
        var orders = _mapper.Map<List<Order>>(wishlistItems);

        foreach (var order in orders)
        {
            // Get product details from the mapped product in the order
            var vmProduct = wishlistItems.First(w => w.ProductId == order.ProductId).Product;
            var product = _mapper.Map<VMProductDetails>(vmProduct);

            var newOrder = _mapper.Map<Order>(product);
            newOrder.OrderDate = DateTime.UtcNow;
            newOrder.IsCompleted = false;
            newOrder.Quantity = order.Quantity;
            newOrder.ClientId = vmProduct.Brand.ClientId;


            // Add the order to the context
            _context.Set<Order>().Add(newOrder);
        }

        // Clear the wishlist for the user
        _context.CartItems.RemoveRange(wishlistItems);

        // Save changes to the database
        await _context.SaveChangesAsync();
    }
    
    public async Task<bool> DeleteOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
    
        if (order == null)
        {
            return false; // Order not found
        }

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return true; // Order successfully deleted
    }


}