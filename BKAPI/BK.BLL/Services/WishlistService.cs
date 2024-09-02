using BK.BLL.Repositories;
using BK.DAL.ViewModels.Wishlist;

namespace BK.BLL.Services;

public class WishlistService : IWishlistRepository
{
    private readonly IWishlistRepository _wishlistRepository;
    public WishlistService(IWishlistRepository wishlistRepository)
    {
        _wishlistRepository = wishlistRepository;
    }
    public Task AddToWishlistAsync(VMWishlistItem wishlistItem)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<VMWishlistItem>> GetWishlistByUserIdAsync(int userId)
    {
        throw new NotImplementedException();
    }

    public Task RemoveFromWishlistAsync(int wishlistItemId)
    {
        throw new NotImplementedException();
    }
}