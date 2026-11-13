using System.ComponentModel.DataAnnotations;

namespace STLourdes.Api.Models
{
    public class AdmissionEnquiryRequest
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Course { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;
    }
}