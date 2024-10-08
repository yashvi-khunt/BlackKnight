namespace BK.DAL.ViewModels.Wishlist;

public class VMGetCartItem
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ClientId { get; set; }
    public string WishlisterId { get; set; }
    public string BrandId { get; set; }
    public string WishlisterName { get; set; }
    public int Quantity { get; set; }
    public DateTime DateAdded { get; set; }
    public string Image { get; set; }
    public string BoxName { get; set; }
    public string ClientName { get; set; }
    public string BrandName { get; set; }
    public float JobWorkerRate { get; set; }
    public double FinalRate { get; set; }
}