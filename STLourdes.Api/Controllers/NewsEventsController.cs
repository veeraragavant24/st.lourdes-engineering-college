using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STLourdes.Api.Data;
using STLourdes.Api.DTOs;
using STLourdes.Api.Models;

namespace STLourdes.Api.Controllers
{
    [ApiController]
    [Route("api/news-events")]
    public class NewsEventsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _environment;

        public NewsEventsController(
            ApplicationDbContext db,
            IWebHostEnvironment environment)
        {
            _db = db;
            _environment = environment;
        }

        // ------------------------------------------
        // GET ALL NEWS AND EVENTS
        // Public: Published items only
        // Admin: All items when authenticated
        // ------------------------------------------

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var query = _db.NewsEvents.AsNoTracking();

            if (!(User.Identity?.IsAuthenticated == true &&
                  User.IsInRole("Admin")))
            {
                query = query.Where(x => x.IsPublished);
            }

            var items = await query
                .OrderByDescending(x => x.Date)
                .ToListAsync();

            return Ok(items);
        }

        // ------------------------------------------
        // GET SINGLE NEWS OR EVENT
        // ------------------------------------------

        [HttpGet("{id:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(Guid id)
        {
            var item = await _db.NewsEvents
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
                return NotFound(new { message = "News or event not found." });

            if (!item.IsPublished &&
                !(User.Identity?.IsAuthenticated == true &&
                  User.IsInRole("Admin")))
            {
                return NotFound();
            }

            return Ok(item);
        }

        // ------------------------------------------
        // CREATE NEWS OR EVENT
        // ------------------------------------------

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(
            [FromBody] NewsEventRequest request)
        {
            var item = new NewsEvent
            {
                Title = request.Title.Trim(),
                Date = request.Date,
                Type = request.Type,
                Excerpt = request.Excerpt.Trim(),
                Content = request.Content,
                ImageUrl = request.ImageUrl,
                Location = request.Location,
                IsPublished = request.IsPublished,
                IsFeatured = request.IsFeatured,
                CreatedAt = DateTime.UtcNow
            };

            _db.NewsEvents.Add(item);

            await _db.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetById),
                new { id = item.Id },
                item);
        }

        // ------------------------------------------
        // UPDATE NEWS OR EVENT
        // ------------------------------------------

        [HttpPut("{id:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(
            Guid id,
            [FromBody] NewsEventRequest request)
        {
            var item = await _db.NewsEvents
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
                return NotFound(new { message = "News or event not found." });

            item.Title = request.Title.Trim();
            item.Date = request.Date;
            item.Type = request.Type;
            item.Excerpt = request.Excerpt.Trim();
            item.Content = request.Content;
            item.ImageUrl = request.ImageUrl;
            item.Location = request.Location;
            item.IsPublished = request.IsPublished;
            item.IsFeatured = request.IsFeatured;
            item.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return Ok(item);
        }

        // ------------------------------------------
        // DELETE NEWS OR EVENT
        // ------------------------------------------

        [HttpDelete("{id:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var item = await _db.NewsEvents
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
                return NotFound(new { message = "News or event not found." });

            _db.NewsEvents.Remove(item);

            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "News or event deleted successfully."
            });
        }

        // ------------------------------------------
        // UPLOAD NEWS OR EVENT IMAGE
        // ------------------------------------------

        [HttpPost("upload-image")]
        [Authorize(Roles = "Admin")]
        [RequestSizeLimit(5 * 1024 * 1024)]
        public async Task<IActionResult> UploadImage(
            IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new
                {
                    message = "Please select an image."
                });
            }

            if (file.Length > 5 * 1024 * 1024)
            {
                return BadRequest(new
                {
                    message = "Image size must not exceed 5 MB."
                });
            }

            var allowedTypes = new Dictionary<string, string>
            {
                { ".jpg", "image/jpeg" },
                { ".jpeg", "image/jpeg" },
                { ".png", "image/png" },
                { ".webp", "image/webp" }
            };

            var extension = Path.GetExtension(file.FileName)
                .ToLowerInvariant();

            if (!allowedTypes.TryGetValue(extension, out var expectedMime) ||
                !string.Equals(
                    file.ContentType,
                    expectedMime,
                    StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new
                {
                    message = "Only JPG, JPEG, PNG and WEBP images are allowed."
                });
            }

            var uploadsFolder = Path.Combine(
                _environment.WebRootPath ?? _environment.ContentRootPath,
                "uploads");

            Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{extension}";

            var filePath = Path.Combine(
                uploadsFolder,
                fileName);

            await using (var stream = new FileStream(
                filePath,
                FileMode.CreateNew))
            {
                await file.CopyToAsync(stream);
            }

            var imageUrl =
                $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";

            return Ok(new
            {
                message = "Image uploaded successfully.",
                imageUrl
            });
        }
    }
}