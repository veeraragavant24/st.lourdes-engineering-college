namespace STLourdes.Api.Models
{
    public class NewsEvent
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Title { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public string Type { get; set; } = "News";

        public string Excerpt { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }

        public string? Location { get; set; }

        public bool IsPublished { get; set; } = false;

        public bool IsFeatured { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}