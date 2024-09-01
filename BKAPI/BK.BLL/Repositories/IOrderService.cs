using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IOrderService
{
    Task AddOrder(VMAddOrder vmAddOrder);
    Task UpdateOrder();
    Task<VMGetAll<VMGetAllOrder>> GetAllOrders();
    Task GetOrderById(int id);
    Task<VMOrderDashboard> GetOrderDashboardData();
}