using BK.DAL.ViewModels;

namespace BK.BLL.Repositories;

public interface IBrandService
{
    Task AddBrand(VMAddBrand addBrandModel);
    Task<List<VMOptions>> GetBrandOptions(string clientId);
    Task UpdateBrand(int id, VMAddBrand updateBrandModel);
    Task<VMBrandDetails> GetBrandById(int id);
    // Task<List<VMBrandDetails>> GetAllBrands();
}