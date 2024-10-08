using BK.BLL.Helper;
using BK.BLL.Repositories;
using BK.DAL.ViewModels.Wishlist;
using Microsoft.AspNetCore.Mvc;
using BK.DAL.Models;
using Microsoft.AspNetCore.Identity;

namespace BK.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistService _wishlistService;
        private readonly UserManager<ApplicationUser> _userManager;

        public WishlistController(UserManager<ApplicationUser> userManager,IWishlistService wishlistService)
        {
            _userManager = userManager;
            _wishlistService = wishlistService;
        }

        // GET: api/wishlist
        [HttpGet]
        public async Task<IActionResult> GetWishlist()
        {
            var user = await _userManager.GetUserAsync(User); // Get the logged-in user's ID

            if (user == null)
            {
                return Unauthorized(new Response("User is not logged in.", false));
            }

            var wishlist = await _wishlistService.GetWishlistByUserIdAsync(user.Id);

            if (wishlist == null)
            {
                return NotFound(new Response<List<VMGetCartItem>>(null, false, "Wishlist not found."));
            }

            return Ok(new Response<List<VMGetCartItem>>(wishlist, true, "Wishlist loaded successfully."));
        }


        // POST: api/wishlist/addMultiple
        [HttpPost("addMultiple")]
        public async Task<IActionResult> AddMultipleToWishlist([FromBody] List<VMWishlistItem> wishlistItems)
        {
            var user = await _userManager.GetUserAsync(User); // Get the logged-in user's ID

            if (wishlistItems == null || !wishlistItems.Any())
            {
                return BadRequest(new Response("No items to add.",false));
            }

            await _wishlistService.AddMultipleToWishlistAsync(user.Id, wishlistItems);
            return Ok(new Response( "Items successfully added to wishlist",true));
        }

        // DELETE: api/wishlist/remove/{id}
        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemoveFromWishlist(int id)
        {
            var user = await _userManager.GetUserAsync(User); // Get the logged-in user's ID

            try
            {
                await _wishlistService.RemoveFromWishlistAsync(user.Id, id);
                return Ok(new Response(  "Item successfully removed from wishlist" ));
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ex.Message) );
            }
        }

        // PUT: api/wishlist/update/{id}
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateWishlistItem(int id, [FromBody] VMUpdateWishlistItem item )
        {
            var user = await _userManager.GetUserAsync(User); // Get the logged-in user's ID

            try
            {
                await _wishlistService.UpdateWishlistItemAsync(user.Id, id, item.Quantity); 
                return Ok(new Response("Wishlist item updated successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(new Response( ex.Message ,false));
            }
        }

        // DELETE: api/wishlist/clear
        [HttpDelete("clear")]
        public async Task<IActionResult> ClearWishlist()
        {
            var user = await _userManager.GetUserAsync(User); // Get the logged-in user's ID

            await _wishlistService.ClearWishlistAsync(user.Id);
            return Ok(new Response( "Wishlist cleared successfully" ));
        }
    }
}
