namespace BK.BLL.Repositories;

public interface IProductService
{
    Task AddProduct();
    Task UpdateProduct();
    Task GetAllProducts();
    Task GetProductById(int id);
}