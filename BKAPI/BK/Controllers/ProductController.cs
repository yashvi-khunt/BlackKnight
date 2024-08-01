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
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            var products = await _productService.GetAllProducts();
            return Ok(new Response<VMGetAll<VMAllProducts>>(products, true, "Products retrieved successfully."));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while retrieving all products.");
            return StatusCode(500, new Response("An error occurred while retrieving products.", false));
        }
    }
    
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
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, VMUpdateProduct vmUpdateProduct)
    {
        if (id <= 0 || vmUpdateProduct == null)
            return BadRequest(new Response("Invalid product ID or request data.", false));

        try
        {
            await _productService.UpdateProduct(id, vmUpdateProduct);
            return Ok(new Response("Product updated successfully", true));
        }
        catch (DbUpdateException ex)
        {
            _logger.Error(ex, "An error occurred while updating the database.");
            return StatusCode(500, new Response("An error occurred while updating the database.", false));
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while updating the product with ID {ProductId}.", id);
            return StatusCode(500, new Response("An error occurred while updating the product.", false));
        }
    }
    
    
    [HttpGet("/api/Print/Options")]
    public async Task<ActionResult<List<VMOptions>>> GetPrintTypeOptions()
    {
        try
        {
            var printTypeOptions = await _productService.GetPrintOptions();
            return Ok(new Response<List<VMOptions>>(printTypeOptions));
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}