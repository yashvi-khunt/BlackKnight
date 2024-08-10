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

   public async Task UpdateProduct(int id, VMUpdateProduct updateProduct)
{
    // Retrieve the product from the database
    var product = await _context.Products
        .Include(p => p.Images) // Include existing images
        .FirstOrDefaultAsync(p => p.Id == id);

    if (product != null)
    {
        // Update product properties if the provided value is not null
        product.BoxName = updateProduct.BoxName ?? product.BoxName;
        product.BrandId = updateProduct.BrandId ?? product.BrandId;
        product.TopPaperTypeId = updateProduct.TopPaperTypeId ?? product.TopPaperTypeId;
        product.FlutePaperTypeId = updateProduct.FlutePaperTypeId ?? product.FlutePaperTypeId;
        product.BackPaperTypeId = updateProduct.BackPaperTypeId ?? product.BackPaperTypeId;
        product.Length = updateProduct.Length ?? product.Length;
        product.Width = updateProduct.Width ?? product.Width;
        product.Height = updateProduct.Height ?? product.Height;
        product.Flap1 = updateProduct.Flap1 ?? product.Flap1;
        product.Flat2 = updateProduct.Flat2 ?? product.Flat2;
        product.Deckle = updateProduct.Deckle ?? product.Deckle;
        product.Cutting = updateProduct.Cutting ?? product.Cutting;
        product.Top = updateProduct.Top ?? product.Top;
        product.Flute = updateProduct.Flute ?? product.Flute;
        product.Back = updateProduct.Back ?? product.Back;
        product.NoOfSheetPerBox = updateProduct.NoOfSheetPerBox ?? product.NoOfSheetPerBox;
        product.PrintTypeId = updateProduct.PrintTypeId ?? product.PrintTypeId;
        product.PrintingPlate = updateProduct.PrintingPlate ?? product.PrintingPlate;
        product.Ply = updateProduct.Ply ?? product.Ply;
        product.PrintRate = updateProduct.PrintRate ?? product.PrintRate;
        product.IsLamination = updateProduct.IsLamination ?? product.IsLamination;
        product.DieCode = updateProduct.DieCode ?? product.DieCode;
        product.JobWorkerId = updateProduct.JobWorkerId ?? product.JobWorkerId;
        product.LinerJobWorkerId = updateProduct.LinerJobWorkerId ?? product.LinerJobWorkerId;
        product.ProfitPercent = updateProduct.ProfitPercent ?? product.ProfitPercent;
        product.Remarks = updateProduct.Remarks ?? product.Remarks;
        product.IsActive = updateProduct.IsActive ?? product.IsActive;

        // Update product images
        if (updateProduct.Images != null)
        {
            // Find and remove images that are no longer present
            var imagesToRemove = product.Images
                .Where(existingImage => updateProduct.Images.All(updatedImage => updatedImage.ImagePath != existingImage.ImagePath))
                .ToList();

            _context.Images.RemoveRange(imagesToRemove);

            // Add or update images
            foreach (var vmImage in updateProduct.Images)
            {
                var existingImage = product.Images.FirstOrDefault(img => img.ImagePath == vmImage.ImagePath);
                if (existingImage != null)
                {
                    // Update existing image
                    existingImage.IsPrimary = vmImage.IsPrimary;
                }
                else
                {
                    // Add new image
                    var newImage = new ProductImage
                    {
                        ProductId = product.Id,
                        ImagePath = vmImage.ImagePath,
                        IsPrimary = vmImage.IsPrimary
                    };
                    _context.Images.Add(newImage);
                }
            }
        }

        // Save changes to the database
        await _context.SaveChangesAsync();
    }
    else
    {
        throw new Exception("Product not found");
    }
}
   
    public async Task<VMGetAll<VMAllProducts>> GetAllProducts()
        {
            var products = await _context.Products
                .Include(p => p.Brand)
                .ThenInclude(b => b.Client)
                .Include(x => x.Images)
                .Include(p => p.TopPaperType)
                .Include(p => p.FlutePaperType)
                .Include(p => p.BackPaperType)
                .Include(p => p.PrintType)
                .Include(p => p.JobWorker)
                    .ThenInclude(j=>j.User)
                .Include(p => p.LinerJobWorker)
                .ToListAsync();

            // Map to VMProductDetails
            var productDetailsList = _mapper.Map<List<VMProductDetails>>(products);

            // Map to VMAllProducts
            var productViewModels = _mapper.Map<List<VMAllProducts>>(productDetailsList);

            return new VMGetAll<VMAllProducts>
            {
                Count = productViewModels.Count,
                Data = productViewModels
            };
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
                .ThenInclude(j=>j.User)
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

    public async Task<List<VMOptions>> GetPrintOptions()
    {
        try
        {
            var printTypes = await _context.PrintTypes.ToListAsync();
            var printTypeOptions = printTypes.Select(pt => new VMOptions
            {
                Value = pt.Id.ToString(),
                Label = pt.Name + $"{(pt.IsOffset ? " Offset" : "")}"
            }).ToList();

            return printTypeOptions;
        }
        catch (Exception ex)
        {
            // Log exception (if logging is implemented)
            throw new Exception("Error fetching paper type options", ex);
        }
    }
}