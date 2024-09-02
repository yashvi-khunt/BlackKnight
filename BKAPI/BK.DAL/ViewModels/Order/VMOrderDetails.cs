namespace BK.DAL.ViewModels;

public class VMOrderDetails
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public DateTime OrderDate { get; set; }
    public float JobWorkerRate { get; set; }
    public float FinalRate { get; set; }
    public bool IsCompleted { get; set; }
}