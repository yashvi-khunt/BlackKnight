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
    public async Task<IActionResult> GetAllOrders([FromQuery] DateTime? fromDate = null, [FromQuery] DateTime? toDate = null,
        [FromQuery] string? search = null, [FromQuery] string? field = "ClientName", 
        [FromQuery] string? sort = "asc", [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var result = await _orderService.GetAllOrders(fromDate, toDate, search, field, sort, page, pageSize);
            return Ok(new Response<VMGetAll<VMGetAllOrder>>(result, true, "Orders retrieved successfully."));
        }
        catch (Exception ex)
        {
            // _logger.Error(ex, "An error occurred while retrieving all orders.");
            return StatusCode(500, new Response("An error occurred while retrieving orders.", false));
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