using AutoMapper;
using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BKAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController:ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly UserManager<ApplicationUser> _userManager;
    public OrderController(IOrderService orderService,UserManager<ApplicationUser> userManager )
    {
        _userManager = userManager;
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
            return StatusCode(500, new Response("Internal server error.",false));
        }
    }
    [HttpGet("Dashboard")]
    public async Task<IActionResult> GetOrderDashboard()
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            var result = await _orderService.GetOrderDashboardData(user.Id);

            if (result == null)
            {
                return NotFound(new Response( "No orders found" ,false));
            }

            return Ok(new Response<object>(result, true, "Data loaded successfully"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new Response(   ex.Message ,false));
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> AddOrder()
    {
        // Assume the userId is obtained from the user claims or session
        var user = await _userManager.GetUserAsync(User); // This assumes you're using Identity

        try
        {
            await _orderService.AddOrderWithWishlist(user.Id);
            return Ok(new Response("Orders added successfully."));
        }
        catch (Exception ex)
        {
            //_logger.LogError(ex, "An error occurred while adding the orders.");
            return StatusCode(500, new Response("Internal server error."));
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        try
        {
            var order = await _orderService.GetOrderById(id);

            if (order == null)
            {
                return NotFound(new Response("Order not found.", false));
            }

            await _orderService.DeleteOrder(id);

            return NoContent(); // 204 No Content, as the order was successfully deleted.
        }
        catch (Exception ex)
        {
            //_logger.LogError(ex, "An error occurred while deleting the order.");
            return StatusCode(500, new Response("Internal server error.", false));
        }
    }

}