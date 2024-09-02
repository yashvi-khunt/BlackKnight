using BK.DAL.ViewModels.Wishlist;

namespace BK.BLL.Repositories;


public interface IWishlistRepository
{
    Task AddToWishlistAsync(VMWishlistItem wishlistItem);
    Task<IEnumerable<VMWishlistItem>> GetWishlistByUserIdAsync(int userId);
    //Task<VMWishlistItem> GetWishlistItemAsync(int userId, int productId);
    Task RemoveFromWishlistAsync(int wishlistItemId);
}