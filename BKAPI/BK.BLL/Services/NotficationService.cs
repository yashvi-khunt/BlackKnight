using BK.BLL.Repositories;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;


namespace BK.BLL.Services;

public class NotficationService : INotficationService
{
    public NotficationService()
    {
        // Initialize Firebase using the relative path to the service account JSON
        var serviceAccountPath = Path.Combine(Directory.GetCurrentDirectory(), "serviceAccount.json");

        FirebaseApp.Create(new AppOptions()
        {
            Credential = GoogleCredential.FromFile(serviceAccountPath),
        });
    }

    public async Task<string> SendNotificationAsync(string token, string title, string body)
    {
        var message = new Message()
        {
            Token = token,
            Notification = new Notification()
            {
                Title = title,
                Body = body,
            },
        };

        string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
        return response; // Response contains the message ID
    }
}