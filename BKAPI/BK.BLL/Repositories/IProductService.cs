using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IProductService
{
    Task AddProduct(VMAddProduct addProductModel);
    Task UpdateProduct();
    Task GetAllProducts();
    Task<VMProductDetails> GetProductById(int id);
}