using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STLourdes.Api.Models;
using STLourdes.Api.Services;

namespace STLourdes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AdmissionEnquiryController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly ILogger<AdmissionEnquiryController> _logger;

        public AdmissionEnquiryController(
            EmailService emailService,
            ILogger<AdmissionEnquiryController> logger)
        {
            _emailService = emailService;
            _logger = logger;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitEnquiry(
            [FromBody] AdmissionEnquiryRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Please provide valid enquiry details."
                });
            }

            try
            {
                await _emailService.SendAdmissionEnquiryAsync(
                    request.Name.Trim(),
                    request.Email.Trim(),
                    request.Phone.Trim(),
                    request.Course.Trim(),
                    request.Description.Trim()
                );

                return Ok(new
                {
                    success = true,
                    message = "Your admission enquiry has been sent successfully."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Failed to send admission enquiry for {Email}",
                    request.Email);

                return StatusCode(500, new
                {
                    success = false,
                    message = "Unable to send your enquiry. Please try again later."
                });
            }
        }
    }
}