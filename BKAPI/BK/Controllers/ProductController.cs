using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ILogger = Serilog.ILogger;

namespace BKAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    private ILogger _logger;

    public ProductController(IProductService productService, ILogger logger)
    {
        _productService = productService;
        _logger = logger;
    }
    
    
    //GET
    
    
    //GET BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        if (id <= 0)
            return BadRequest(new Response("Invalid product ID.", false));

        try
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
                return NotFound(new Response("Product not found.", false));

            return Ok(new Response<VMProductDetails>( product,true,"Product retrieved successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while retrieving the product with ID {ProductId}.", id);
            return StatusCode(500, new Response("An error occurred while retrieving the product.", false));
        }
    }
    
    
    //POST
    [HttpPost]
    public async Task<IActionResult> AddProduct(VMAddProduct vmAddProduct)
    {
        if (vmAddProduct == null)
            return BadRequest(new Response("Please send the data correctly.", false));
        try
        {
            await _productService.AddProduct(vmAddProduct);
            return Ok(new Response( "Product added successfully"));
        }
        catch (DbUpdateException ex)
        {
            _logger.Error(ex, "An error occurred while updating the database.");
            return StatusCode(500, new Response( "An error occurred while updating the database.",false ));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while adding the product.");
            return StatusCode(500, new Response( "An error occurred while adding the product.",false ));
        }
    }
    
    //PUT
}