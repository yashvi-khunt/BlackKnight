using AutoMapper;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace BK.BLL.Services;

public class OrderService:IOrderService
{
    private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public OrderService(IMapper mapper , ApplicationDbContext context, UserManager<ApplicationUser> userManager)
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

    // public async Task AddOrder(VMAddOrder addOrderModel)
    //     {
    //         var order = _mapper.Map<Order>(addOrderModel);
    //         order.OrderDate = DateTime.Now;
    //         order.IsCompleted = false; // Default value for new orders
    //
    //         _context.Orders.Add(order);
    //         await _context.SaveChangesAsync();
    //
    //         // Additional logic, if any, goes here
    //     }

        // public async Task UpdateOrder(int id, VMUpdateOrder updateOrderModel)
        // {
        //     var order = await _context.Orders
        //         .Include(o => o.Product)
        //         .Include(o => o.Client)
        //         .FirstOrDefaultAsync(o => o.Id == id);
        //
        //     if (order == null)
        //     {
        //         throw new Exception("Order not found");
        //     }
        //
        //     _mapper.Map(updateOrderModel, order);
        //
        //     // Save changes to the database
        //     await _context.SaveChangesAsync();
        // }

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
        "orderDate" => sort == "asc" ? ordersQuery.OrderBy(o => o.OrderDate) : ordersQuery.OrderByDescending(o => o.OrderDate),
        "clientName" => sort == "asc" ? ordersQuery.OrderBy(o => o.Product.Brand.Client.CompanyName) : ordersQuery.OrderByDescending(o => o.Product.Brand.Client.CompanyName),
        "boxName" => sort == "asc" ? ordersQuery.OrderBy(o => o.Product.BoxName) : ordersQuery.OrderByDescending(o => o.Product.BoxName),
        "quantity" => sort == "asc" ? ordersQuery.OrderBy(o => o.Quantity) : ordersQuery.OrderByDescending(o => o.Quantity),
        "jobWorkerRate" => sort == "asc" ? ordersQuery.OrderBy(o => o.JobWorkerRate) : ordersQuery.OrderByDescending(o => o.JobWorkerRate),
        "profitPercent" => sort == "asc" ? ordersQuery.OrderBy(o => o.Product.ProfitPercent) : ordersQuery.OrderByDescending(o => o.Product.ProfitPercent),
        "finalRate" => sort == "asc" ? ordersQuery.OrderBy(o => o.FinalRate) : ordersQuery.OrderByDescending(o => o.FinalRate),
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

        public async Task<VMOrderDashboard> GetOrderDashboardData()
        {
            // Fetch all orders from the database
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

            // Fetch products and clients data
            var products = await _context.Products.ToListAsync();
            var clients = await _userManager.GetUsersInRoleAsync("Client");

            // Map the orders to ViewModel
            var orderViewModels = _mapper.Map<List<VMGetAllOrder>>(orders);

            // Segregate orders based on their status
            var pendingOrders = orderViewModels.Where(o => !o.IsCompleted).ToList();
            var completedOrders = orderViewModels.Where(o => o.IsCompleted).ToList();

            // Calculate flash card data
            var flashCards = new List<VMFlashCard>
            {
                new VMFlashCard { Title = "Pending Orders", Count = pendingOrders.Count },
                new VMFlashCard { Title = "Completed Orders", Count = completedOrders.Count },
                new VMFlashCard { Title = "Total Products", Count = products.Count },
                new VMFlashCard { Title = "Total Clients", Count = clients.Count }
            };

            // Construct the response
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

}