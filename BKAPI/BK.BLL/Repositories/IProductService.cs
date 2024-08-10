using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IProductService
{
    Task AddProduct(VMAddProduct addProductModel);
    Task UpdateProduct(int id, VMUpdateProduct updateProduct);
    Task<VMGetAll<VMAllProducts>> GetAllProducts();
    Task<VMProductDetails> GetProductById(int id);
    Task<List<VMOptions>> GetPrintOptions();
}