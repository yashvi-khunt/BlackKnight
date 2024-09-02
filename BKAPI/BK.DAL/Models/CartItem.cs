using System.ComponentModel.DataAnnotations.Schema;

namespace BK.DAL.Models;

public class CartItem
{
        public int Id { get; set; }
        [ForeignKey("ProductId")]
        public int ProductId { get; set; }
        [ForeignKey("ClientId")]
        public string ClientId { get; set; }
        public int Quantity { get; set; }
        public DateTime DateAdded { get; set; }

        // Navigation Properties
        public virtual Product Product { get; set; }
        public virtual ApplicationUser Client{ get; set; }
}