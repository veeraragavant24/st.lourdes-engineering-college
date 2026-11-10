using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STLourdes.Api.Services;

namespace STLourdes.Api.Controllers
{
    [ApiController]
    [Route("api/email-test")]
    [Authorize(Roles = "Admin")]
    public class EmailTestController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailTestController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendTestEmail(
            [FromQuery] string email)
        {
            try
            {
                await _emailService.SendEmailAsync(
                    email,
                    "ST Lourdes SMTP Test",
                    "<h2>ST Lourdes Engineering College</h2>" +
                    "<p>Gmail SMTP email service is working successfully!</p>"
                );

                return Ok(new
                {
                    message = "Test email sent successfully."
                });
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "Email delivery failed. Check SMTP configuration."
                });
            }
        }
    }
}
