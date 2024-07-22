using AutoMapper;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace BK.BLL.Services;

public class ProductService : IProductService
{
    private readonly IMapper _mapper;
    private readonly ApplicationDbContext _context;

    public ProductService(IMapper mapper, ApplicationDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }
    public async Task AddProduct(VMAddProduct addProductModel)
    {
        // Get the highest serial number from the existing products
        int maxSerialNumber = await _context.Set<Product>().MaxAsync(p => (int?)p.SerialNumber) ?? 0;

        // Map the ViewModel to the Product entity
        var product = _mapper.Map<Product>(addProductModel);
            
        // Set the serial number for the new product
        product.SerialNumber = maxSerialNumber + 1;
        product.CreatedDate = DateTime.Now;
        product.IsActive = true;

        // Add the new product to the context
        _context.Set<Product>().Add(product);
        await _context.SaveChangesAsync();

        // Add product images
        if (addProductModel.Images != null)
        {
            foreach (var vmImage in addProductModel.Images)
            {
                var productImage = new ProductImage
                {
                    ProductId = product.Id,
                    ImagePath = vmImage.ImagePath,
                    IsPrimary = vmImage.IsPrimary
                };
                _context.Set<ProductImage>().Add(productImage);
            }
        }

        await _context.SaveChangesAsync();
    }
    public Task UpdateProduct()
    {
        throw new NotImplementedException();
    }

    public Task GetAllProducts()
    {
        throw new NotImplementedException();
    }

    public async Task<VMProductDetails> GetProductById(int id)
    {
        // Retrieve the product along with related entities
        var product = await _context.Products
            .Include(p => p.Brand)
            .ThenInclude(b => b.Client)
            .Include(p => p.TopPaperType)
            .Include(p => p.FlutePaperType)
            .Include(p => p.BackPaperType)
            .Include(p => p.PrintType)
            .Include(p => p.JobWorker)
            .Include(p => p.LinerJobWorker)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return null;
        }

        // Map the product entity to the VMProductDetails view model
        var productDetails = _mapper.Map<VMProductDetails>(product);
     
        return productDetails;
    }
}