using AutoMapper;
using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BKAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController:ControllerBase
{
    private readonly IOrderService _orderService;
    

    public OrderController(IOrderService orderService )
    {
        _orderService = orderService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        try
        {
            var result = await _orderService.GetAllOrders();
            return Ok(new Response<VMGetAll<VMGetAllOrder>>(result));
        }
        catch (Exception ex)
        {
            //_logger.LogError(ex, "An error occurred while getting all orders.");
            return StatusCode(500, "Internal server error.");
        }
    }
}