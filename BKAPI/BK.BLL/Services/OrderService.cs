using AutoMapper;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.ViewModels;
using Microsoft.EntityFrameworkCore;


namespace BK.BLL.Services;

public class OrderService:IOrderService
{
    private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context; 

        public OrderService(IMapper mapper , ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }
    public Task AddOrder()
    {
        throw new NotImplementedException();
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

        public async Task<VMGetAll<VMGetAllOrder>> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Client)
                .Include(o => o.Product)
                    .ThenInclude(p => p.Images).Include(p => p.Product).ThenInclude(p=>p.JobWorker).ThenInclude(j=>j.User)
                .ToListAsync();

            var orderViewModels = _mapper.Map<List<VMGetAllOrder>>(orders);

            return new VMGetAll<VMGetAllOrder>
            {
                Count = orderViewModels.Count,
                Data = orderViewModels
            };
        }

        // public async Task<VMOrderDetails> GetOrderById(int id)
        // {
        //     var order = await _context.Orders
        //         .Include(o => o.Client)
        //         .Include(o => o.Product)
        //             .ThenInclude(p => p.Images)
        //         .FirstOrDefaultAsync(o => o.Id == id);
        //
        //     if (order == null)
        //     {
        //         return null;
        //     }
        //
        //     var orderDetails = _mapper.Map<VMOrderDetails>(order);
        //     return orderDetails;
        // }

       
    

    public Task GetOrderById(int id)
    {
        throw new NotImplementedException();
    }
}