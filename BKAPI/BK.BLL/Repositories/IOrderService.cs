using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IOrderService
{
    Task AddOrder(VMAddOrder vmAddOrder);
    Task UpdateOrder();
    Task<VMGetAll<VMGetAllOrder>> GetAllOrders();
    Task<VMOrderDetails> GetOrderById(int id);
    Task<VMOrderDashboard> GetOrderDashboardData();
}