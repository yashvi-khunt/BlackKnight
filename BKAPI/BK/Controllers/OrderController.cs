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
    
    [HttpGet("dashboard")]
    public async Task<IActionResult> GetOrderDashboard()
    {
        try
        {
            var result = await _orderService.GetAllOrders();

            if (result == null)
            {
                return NotFound(new { message = "No orders found" });
            }

            // Transform the result into the desired JSON format
            var response = new
            {
                flashCards = new[]
                {
                    new { title = "Total Orders", count = result.Data.Count },
                    new { title = "Pending Orders", count = result.Data.Count(o => !o.IsCompleted) },
                    new { title = "Completed Orders", count = result.Data.Count(o => o.IsCompleted) }
                },
                orders = new
                {
                    pending = result.Data.Where(o => !o.IsCompleted).ToList(),
                    completed = result.Data.Where(o => o.IsCompleted).ToList()
                }
            };

            return Ok(new { data = new[] { response } });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}