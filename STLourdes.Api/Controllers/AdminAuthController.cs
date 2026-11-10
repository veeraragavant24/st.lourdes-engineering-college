using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using STLourdes.Api.Data;
using STLourdes.Api.DTOs;
using STLourdes.Api.Models;

namespace STLourdes.Api.Controllers
{
    [ApiController]
    [Route("api/admin/auth")]
    public class AdminAuthController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IPasswordHasher<AdminUser> _hasher;
        private readonly IConfiguration _configuration;

        public AdminAuthController(
            ApplicationDbContext db,
            IPasswordHasher<AdminUser> hasher,
            IConfiguration configuration)
        {
            _db = db;
            _hasher = hasher;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] AdminLoginRequest request)
        {
            var email = request.Email.Trim().ToLowerInvariant();

            var admin = await _db.AdminUsers
                .FirstOrDefaultAsync(x =>
                    x.Email == email && x.IsActive);

            if (admin == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            var verification = _hasher.VerifyHashedPassword(
                admin,
                admin.PasswordHash,
                request.Password);

            if (verification == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            if (verification == PasswordVerificationResult.SuccessRehashNeeded)
            {
                admin.PasswordHash = _hasher.HashPassword(
                    admin,
                    request.Password);

                await _db.SaveChangesAsync();
            }

            var jwtKey = _configuration["Jwt:Key"]!;
            var issuer = _configuration["Jwt:Issuer"]!;
            var audience = _configuration["Jwt:Audience"]!;

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()),
                new Claim(ClaimTypes.Name, admin.Name),
                new Claim(ClaimTypes.Email, admin.Email),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey));

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: credentials);

            var tokenString = new JwtSecurityTokenHandler()
                .WriteToken(token);

            return Ok(new AdminLoginResponse
            {
                Token = tokenString,
                Name = admin.Name,
                Email = admin.Email
            });
        }

       
    }
}