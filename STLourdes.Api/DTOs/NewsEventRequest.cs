using System.ComponentModel.DataAnnotations;

namespace STLourdes.Api.DTOs
{
    public class NewsEventRequest
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [RegularExpression("^(News|Event)$")]
        public string Type { get; set; } = "News";

        [Required]
        [StringLength(500)]
        public string Excerpt { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }

        public string? Location { get; set; }

        public bool IsPublished { get; set; }

        public bool IsFeatured { get; set; }
    }
}