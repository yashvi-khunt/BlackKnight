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