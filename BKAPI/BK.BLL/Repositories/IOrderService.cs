namespace BK.BLL.Repositories;

public interface IOrderService
{
    Task AddOrder();
    Task UpdateOrder();
    Task GetAllOrders();
    Task GetOrderById(int id);
}