using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IOrderService
{
    Task AddOrder();
    Task UpdateOrder();
    Task<VMGetAll<VMGetAllOrder>> GetAllOrders();
    Task GetOrderById(int id);
}