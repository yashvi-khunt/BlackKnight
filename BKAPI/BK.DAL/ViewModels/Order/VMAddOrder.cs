namespace BK.DAL.ViewModels;


public class VMSingleOrder
{
    public int ProductId { get; set;}
    public int Quantity { get; set; }
    public float JobWorkerRate { get; set; }
    public float FinalRate { get; set; }
}

public class VMAddOrder
{
     public List<VMSingleOrder> Orders { get; set; }
}

