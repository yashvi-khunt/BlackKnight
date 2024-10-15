namespace BK.BLL.Repositories;

public interface INotficationService
{
    Task<string> SendNotificationAsync(string token, string title, string body);
}