using BK.DAL.Models;
using BK.DAL.ViewModels.Wishlist;

namespace BK.BLL.Repositories;


public interface IWishlistService
{ 
    Task<List<VMGetCartItem>> GetWishlistByUserIdAsync(string userId);
    Task AddMultipleToWishlistAsync(string userId, List<VMWishlistItem> wishlistItems);
    Task RemoveFromWishlistAsync(string userId, int itemId);
    Task UpdateWishlistItemAsync(string userId, int itemId, int quantity);
    Task ClearWishlistAsync(string userId);
}