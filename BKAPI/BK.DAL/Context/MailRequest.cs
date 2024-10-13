namespace BK.DAL.Context;

public class MailRequest
{
    public string RecipientEmail { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}