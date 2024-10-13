using BK.DAL.Context;

namespace BK.BLL.Repositories;

public interface IEmailService
{
    Task SendEmailAsync(MailRequest mailRequest);
}