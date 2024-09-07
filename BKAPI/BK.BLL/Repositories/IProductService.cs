using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IProductService
{
    Task AddProduct(VMAddProduct addProductModel);
    Task UpdateProduct(int id, VMUpdateProduct updateProduct);

    Task<VMGetAll<VMAllProducts>> GetAllProducts(string? search , string? field ,
        string? sort , int page , int pageSize);
    Task<VMProductDetails> GetProductById(int id);
    Task<List<VMOptions>> GetPrintOptions();
}