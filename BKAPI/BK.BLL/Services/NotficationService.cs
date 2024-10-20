using BK.BLL.Repositories;
using BK.DAL.Context;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;


namespace BK.BLL.Services;

public class NotficationService : INotficationService
{
    private readonly ApplicationDbContext _context;
    public NotficationService(ApplicationDbContext context)
    {
        _context = context;
        // Initialize Firebase using the relative path to the service account JSON
        if (FirebaseApp.DefaultInstance == null)
        {
            var serviceAccountPath = Path.Combine(Directory.GetCurrentDirectory(), "serviceAccount.json");

            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(serviceAccountPath),
            });
        }
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

    public async Task CreateAndSendNotificationAsync(string userId, string heading, string body)
    {
        var notification = new DAL.Models.Notification()
        {
            UserId = userId,
            Heading = heading,
            Body = body,
            CreatedAt = DateTime.UtcNow
        };

        // Add the notification to the database
        await _context.Notifications.AddAsync(notification);
        await _context.SaveChangesAsync();

        // Retrieve device token for the user
        var deviceToken = await _context.Devices
            .Where(d => d.UserId == userId)
            .Select(d => d.DeviceToken)
            .FirstOrDefaultAsync();

        // If a device token exists, send the notification
        if (!string.IsNullOrEmpty(deviceToken))
        {
            await SendNotificationAsync(deviceToken, heading, body);
        }
    }
}