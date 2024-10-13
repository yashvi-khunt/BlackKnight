using BK.BLL.Repositories;
using BK.DAL.Context;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace BK.BLL.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings settings;

    public EmailService(IOptions<EmailSettings> options)
    {
        this.settings = options.Value;
    }

    public async Task SendEmailAsync(MailRequest mailRequest)
    {
        var email = new MimeMessage();
        email.Sender = MailboxAddress.Parse(settings.SenderEmail);
        email.To.Add(MailboxAddress.Parse(mailRequest.RecipientEmail));
        email.Subject = mailRequest.Subject;

        var builder = new BodyBuilder();
        builder.HtmlBody = mailRequest.Body;
        email.Body = builder.ToMessageBody();

        using var smtp = new MailKit.Net.Smtp.SmtpClient();
        smtp.Connect(settings.Host, settings.Port, SecureSocketOptions.StartTls);
        smtp.Authenticate(settings.SenderEmail, settings.Password);

        await smtp.SendAsync(email);
        smtp.Disconnect(true);

    }
}