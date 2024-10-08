using AutoMapper;
using BK.BLL.Repositories;
using BK.DAL.Context;
using BK.DAL.Models;
using BK.DAL.ViewModels;
using BK.DAL.ViewModels.Wishlist;
using Microsoft.EntityFrameworkCore;

namespace BK.BLL.Services
{
    public class WishlistService : IWishlistService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public WishlistService(ApplicationDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Fetch the wishlist items for a specific user based on their userId (admin or regular user)
        public async Task<List<VMGetCartItem>> GetWishlistByUserIdAsync(string userId)
        {
            var wishlistItems = await _context.CartItems
                .Include(c => c.Product)
                .ThenInclude(p => p.Images)
                .Include(c => c.Product.Brand).ThenInclude(c => c.Client)
                .Include(c => c.Product.PrintType)
                .Include(c => c.Product.TopPaperType)
                .Include(c => c.Product.FlutePaperType).Include(c => c.Product.BackPaperType)
                .Include(c => c.Product.JobWorker)
                .Include(c => c.Product.LinerJobWorker)
                .Include(c => c.Client).Where(x => x.ClientId == userId)
                .ToListAsync();

            // // Convert wishlist items to product details
            // var productDetailsList = _mapper.Map<List<VMProductDetails>>(wishlistItems);
            //
            // // Convert product details to VMGetCartItem
            // var cartItems = _mapper.Map<List<VMGetCartItem>>(productDetailsList);
            var cartItems = _mapper.Map<List<VMGetCartItem>>(wishlistItems);

            return cartItems;
        }

        // Add multiple items to the wishlist for a specific user
        public async Task AddMultipleToWishlistAsync(string userId, List<VMWishlistItem> wishlistItems)
        {
            foreach (var item in wishlistItems)
            {
                // Check if the item already exists in the user's wishlist
                var existingItem = await _context.Set<CartItem>()
                    .FirstOrDefaultAsync(x => x.ProductId == item.ProductId && x.ClientId == userId);
        
                if (existingItem != null)
                {
                    // Item exists, update the quantity
                    existingItem.Quantity += item.Quantity; // Add the new quantity to the existing one
                }
                else
                {
                    // Item does not exist, create a new one
                    var newItem = new CartItem
                    {
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        ClientId = userId, // Assign the wishlist to the logged-in user
                        DateAdded = DateTime.UtcNow
                    };
                    await _context.Set<CartItem>().AddAsync(newItem); // Add the new item
                }
            }

            // Save changes to the database
            await _context.SaveChangesAsync();
        }

        // Remove a specific item from the wishlist for the current user
        public async Task RemoveFromWishlistAsync(string userId, int itemId)
        {
            var item = await _context.Set<CartItem>().FirstOrDefaultAsync(x => x.Id == itemId && x.ClientId == userId);
            if (item == null)
            {
                throw new Exception("Item not found in your wishlist.");
            }

            _context.Set<CartItem>().Remove(item);
            await _context.SaveChangesAsync();
        }

        // Update an item in the wishlist for the current user
        public async Task UpdateWishlistItemAsync(string userId, int itemId, int quantity)
        {
            var item = await _context.Set<CartItem>().FirstOrDefaultAsync(x => x.Id == itemId && x.ClientId == userId);
            if (item == null)
            {
                throw new Exception("Item not found in your wishlist.");
            }

            item.Quantity = quantity;
            await _context.SaveChangesAsync();
        }

        // Clear the wishlist for the current user
        public async Task ClearWishlistAsync(string userId)
        {
            var wishlistItems = await _context.Set<CartItem>().Where(x => x.ClientId == userId).ToListAsync();
            if (wishlistItems.Any())
            {
                _context.Set<CartItem>().RemoveRange(wishlistItems);
                await _context.SaveChangesAsync();
            }
        }
    }
}
