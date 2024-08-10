using AutoMapper;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.EntityFrameworkCore;
using BK.BLL.Repositories;

namespace BK.BLL.Services
{
    public class BrandService : IBrandService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public BrandService(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task AddBrand(VMAddBrand addBrandModel)
        {
            try
            {
                var brand = _mapper.Map<Brand>(addBrandModel);
                _context.Set<Brand>().Add(brand);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception (if logging is implemented)
                throw new Exception("Error adding brand", ex);
            }
        }

        public async Task<List<VMOptions>> GetBrandOptions(string clientId)
        {
            try
            {
                var brands = await _context.Brands
                    .Where(b => b.ClientId == clientId)
                    .ToListAsync();

                var brandOptions = brands.Select(b => new VMOptions
                {
                    Value = b.Id.ToString(),
                    Label = b.Name
                }).ToList();

                return brandOptions;
            }
            catch (Exception ex)
            {
                // Log exception (if logging is implemented)
                throw new Exception("Error fetching brand options", ex);
            }
        }

        public async Task UpdateBrand(int id, VMAddBrand updateBrandModel)
        {
            try
            {
                var brand = await _context.Brands.FirstOrDefaultAsync(b => b.Id == id);

                if (brand != null)
                {
                    _mapper.Map(updateBrandModel, brand);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("Brand not found");
                }
            }
            catch (Exception ex)
            {
                // Log exception (if logging is implemented)
                throw new Exception("Error updating brand", ex);
            }
        }

        public async Task<VMBrandDetails> GetBrandById(int id)
        {
            try
            {
                var brand = await _context.Brands
                    .Include(b => b.Client)
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (brand == null)
                {
                    return null;
                }

                return _mapper.Map<VMBrandDetails>(brand);
            }
            catch (Exception ex)
            {
                // Log exception (if logging is implemented)
                throw new Exception("Error fetching brand by id", ex);
            }
        }
    }
}
