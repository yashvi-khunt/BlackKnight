namespace BK.DAL.ViewModels;

public class VMGetAll<T>
{
    public int Count { get; set; }
    public List<T> Data { get; set; }
}

public class VMOptions
{
    public string Label { get; set; }
    public string Value { get; set; }
}