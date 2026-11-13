using System.Net;
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

        public async Task SendAdmissionEnquiryAsync(
            string studentName,
            string studentEmail,
            string phone,
            string course,
            string description)
        {
            var host = _configuration["Smtp:Host"];
            var portValue = _configuration["Smtp:Port"];
            var username = _configuration["Smtp:Username"];
            var password = _configuration["Smtp:Password"];
            var fromName = _configuration["Smtp:FromName"];
            var collegeEmail = _configuration["Smtp:CollegeEmail"];

            if (string.IsNullOrWhiteSpace(host) ||
                !int.TryParse(portValue, out var port) ||
                string.IsNullOrWhiteSpace(username) ||
                string.IsNullOrWhiteSpace(password) ||
                string.IsNullOrWhiteSpace(collegeEmail))
            {
                throw new InvalidOperationException(
                    "SMTP settings are missing or invalid.");
            }

            var safeName = WebUtility.HtmlEncode(studentName);
            var safeEmail = WebUtility.HtmlEncode(studentEmail);
            var safePhone = WebUtility.HtmlEncode(phone);
            var safeCourse = WebUtility.HtmlEncode(course);
            var safeDescription = WebUtility.HtmlEncode(description)
                .Replace("\r\n", "<br>")
                .Replace("\n", "<br>");

            var message = new MimeMessage();

            message.From.Add(new MailboxAddress(
                fromName ?? "ST Lourdes Engineering College",
                username));

            message.To.Add(MailboxAddress.Parse(collegeEmail));

            // Replies from the college can go directly to the student.
            message.ReplyTo.Add(MailboxAddress.Parse(studentEmail));

            message.Subject = $"New Admission Enquiry - {studentName}";

            message.Body = new BodyBuilder
            {
                HtmlBody = $@"
                    <div style='font-family:Arial,sans-serif;line-height:1.6;'>
                        <h2>New Admission Enquiry</h2>
                        <p>You have received a new admission enquiry.</p>

                        <table cellpadding='8' cellspacing='0'
                               style='border-collapse:collapse;'>
                            <tr>
                                <td><b>Student Name</b></td>
                                <td>{safeName}</td>
                            </tr>
                            <tr>
                                <td><b>Email</b></td>
                                <td>{safeEmail}</td>
                            </tr>
                            <tr>
                                <td><b>Phone</b></td>
                                <td>{safePhone}</td>
                            </tr>
                            <tr>
                                <td><b>Course</b></td>
                                <td>{safeCourse}</td>
                            </tr>
                            <tr>
                                <td><b>Message</b></td>
                                <td>{safeDescription}</td>
                            </tr>
                        </table>

                        <p>ST Lourdes Engineering College</p>
                    </div>"
            }.ToMessageBody();

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
                host,
                port,
                SecureSocketOptions.StartTls);

            await smtp.AuthenticateAsync(username, password);
            await smtp.SendAsync(message);
            await smtp.DisconnectAsync(true);
        }
    }
}