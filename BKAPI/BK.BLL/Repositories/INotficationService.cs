namespace BK.BLL.Repositories;

public interface INotficationService
{
    Task<string> SendNotificationAsync(string token, string title, string body);
    Task CreateAndSendNotificationAsync(string userId, string heading, string body);
}