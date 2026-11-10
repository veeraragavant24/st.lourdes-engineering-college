using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace STLourdes.Api.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(
            string recipientEmail,
            string subject,
            string htmlBody)
        {
            var senderName =
                _configuration["EmailSettings:SenderName"];

            var senderEmail =
                _configuration["EmailSettings:SenderEmail"];

            var smtpServer =
    _configuration["EmailSettings:SmtpServer"];

if (string.IsNullOrWhiteSpace(smtpServer))
{
    throw new InvalidOperationException(
        "SMTP server configuration is missing.");
}

            var smtpPort =
                _configuration.GetValue<int>("EmailSettings:Port");

            var appPassword =
                _configuration["EmailSettings:AppPassword"];

            if (string.IsNullOrWhiteSpace(senderEmail) ||
                string.IsNullOrWhiteSpace(appPassword))
            {
                throw new InvalidOperationException(
                    "Gmail SMTP credentials are missing.");
            }

            var message = new MimeMessage();

            message.From.Add(new MailboxAddress(
                senderName ?? "ST Lourdes Engineering College",
                senderEmail));

            message.To.Add(MailboxAddress.Parse(recipientEmail));
            message.Subject = subject;

            message.Body = new BodyBuilder
            {
                HtmlBody = htmlBody
            }.ToMessageBody();

            using var client = new SmtpClient();

            await client.ConnectAsync(
                smtpServer,
                smtpPort,
                SecureSocketOptions.StartTls);

            await client.AuthenticateAsync(
                senderEmail,
                appPassword.Replace(" ", ""));

            await client.SendAsync(message);

            await client.DisconnectAsync(true);
        }
    }
}