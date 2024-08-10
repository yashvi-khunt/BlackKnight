using AutoMapper;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using BK.DAL.ViewModels.PaperType;
using Microsoft.EntityFrameworkCore;

namespace BK.BLL.Services;

public class PaperTypeService : IPaperTypeService
{
    private readonly IMapper _mapper;
    private readonly ApplicationDbContext _context;

    public PaperTypeService(IMapper mapper, ApplicationDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task AddPaperType(VMAddPaperType addPaperTypeModel)
    {
        try
        {
            var paperType = _mapper.Map<PaperType>(addPaperTypeModel);
            _context.Set<PaperType>().Add(paperType);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            // Log exception (if logging is implemented)
            throw new Exception("Error adding paper type", ex);
        }
    }

    public async Task<List<VMOptions>> GetPaperTypeOptions()
    {
        try
        {
            var paperTypes = await _context.PaperTypes.ToListAsync();
            var paperTypeOptions = paperTypes.Select(pt => new VMOptions
            {
                Value = pt.Id.ToString(),
                Label = $"{pt.Type} - {pt.BF}BF"
            }).ToList();

            return paperTypeOptions;
        }
        catch (Exception ex)
        {
            // Log exception (if logging is implemented)
            throw new Exception("Error fetching paper type options", ex);
        }
    }

    public async Task UpdatePaperType(int id, VMAddPaperType updatePaperTypeModel)
    {
        try
        {
            var paperType = await _context.PaperTypes.FirstOrDefaultAsync(pt => pt.Id == id);

            if (paperType != null)
            {
                _mapper.Map(updatePaperTypeModel, paperType);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Paper type not found");
            }
        }
        catch (Exception ex)
        {
            // Log exception (if logging is implemented)
            throw new Exception("Error updating paper type", ex);
        }
    }

    public async Task<VMPaperTypeDetails> GetPaperTypeById(int id)
    {
        try
        {
            var paperType = await _context.PaperTypes.FirstOrDefaultAsync(pt => pt.Id == id);

            if (paperType == null)
            {
                return null;
            }

            return _mapper.Map<VMPaperTypeDetails>(paperType);
        }
        catch (Exception ex)
        {
            // Log exception (if logging is implemented)
            throw new Exception("Error fetching paper type by id", ex);
        }
    }
}
    