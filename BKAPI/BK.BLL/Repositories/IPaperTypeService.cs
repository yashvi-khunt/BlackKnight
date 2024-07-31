using BK.DAL.ViewModels;
using BK.DAL.ViewModels.PaperType;

namespace BK.BLL.Repositories;

public interface IPaperTypeService
{
    Task AddPaperType(VMAddPaperType addPaperTypeModel);
    Task<List<VMOptions>> GetPaperTypeOptions();
    Task UpdatePaperType(int id, VMAddPaperType updatePaperTypeModel);
    Task<VMPaperTypeDetails> GetPaperTypeById(int id);
}