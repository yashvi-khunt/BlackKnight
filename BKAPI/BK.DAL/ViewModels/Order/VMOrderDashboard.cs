namespace BK.DAL.ViewModels;


    public class VMFlashCard
    {
        public string Title { get; set; }
        public int Count { get; set; }
    }

    public class VMOrderData
    {
        public List<VMGetAllOrder> Pending { get; set; }
        public List<VMGetAllOrder> Completed { get; set; }
    }

    public class VMOrderDashboard
    {
        public List<VMFlashCard> FlashCards { get; set; }
        public VMOrderData Orders { get; set; }
    }

    

