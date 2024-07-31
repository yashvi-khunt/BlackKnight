namespace BK.DAL.ViewModels;

public class VMAllProducts
{
    public int Id { get; set; }
    public string PrimaryImage { get; set; }
    public string BoxName { get; set; }
    public string ClientName { get; set; }
    public string JobWorkerName { get; set; }
    public double JobWorkerPrice { get; set; }
    public double ProfitPercent { get; set; }
    public double FinalRate { get; set; }
}