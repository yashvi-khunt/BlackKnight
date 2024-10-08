using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IOrderService
{
    Task AddOrder(VMAddOrder vmAddOrder);
    Task UpdateOrder();
    Task<VMGetAll<VMGetAllOrder>> GetAllOrders(DateTime? fromDate , DateTime? toDate , string? search , string? field 
        , string? sor, int page , int pageSize );
    Task<VMOrderDetails> GetOrderById(int id);
    Task<VMOrderDashboard> GetOrderDashboardData();
    Task AddOrderWithWishlist(string userId);
}