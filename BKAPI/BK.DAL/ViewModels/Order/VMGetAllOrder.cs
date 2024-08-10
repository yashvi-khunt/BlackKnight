namespace BK.DAL.ViewModels;

public class VMGetAllOrder
{
    public string ClientName { get; set; }
    public string JobWorkerName { get; set; }
    public string PrimaryImage { get; set; }
    public string BoxName { get; set; }
    public int Quantity { get; set; }
    public double ProfitPercent { get; set; }
    public DateTime OrderDate { get; set; }
    public float JobWorkerRate { get; set; }
    public float FinalRate { get; set; }
    // public bool IsCompleted { get; set; } 
}