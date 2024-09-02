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
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        try
        {
            var result = await _orderService.GetOrderById(id);
            return Ok(new Response<VMOrderDetails>(result,true,"Data loaded successfully."));
        }
        catch (Exception ex)
        {
            //_logger.LogError(ex, "An error occurred while getting all orders.");
            return StatusCode(500, "Internal server error.");
        }
    }
    [HttpGet("Dashboard")]
    public async Task<IActionResult> GetOrderDashboard()
    {
        try
        {
            var result = await _orderService.GetOrderDashboardData();

            if (result == null)
            {
                return NotFound(new { message = "No orders found" });
            }

            return Ok(new Response<object>(result,true,"Data loaded successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> AddOrder([FromBody] VMAddOrder vmAddOrder)
    {
        if (vmAddOrder == null || vmAddOrder.Orders == null || !vmAddOrder.Orders.Any())
        {
            return BadRequest(new Response("Invalid order data.", false));
        }

        try
        {
            await _orderService.AddOrder(vmAddOrder);
            return Ok(new  Response( "Orders added successfully." ));
        }
        catch (Exception ex)
        {
            //_logger.LogError(ex, "An error occurred while adding the orders.");
            return StatusCode(500, new Response(  "Internal server error." ));
        }
    }
}