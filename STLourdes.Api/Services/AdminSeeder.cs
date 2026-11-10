using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using STLourdes.Api.Data;
using STLourdes.Api.Models;

namespace STLourdes.Api.Services
{
    public static class AdminSeeder
    {
        public static async Task SeedAsync(
            IServiceProvider serviceProvider,
            IConfiguration configuration)
        {
            using var scope = serviceProvider.CreateScope();

            var db = scope.ServiceProvider
                .GetRequiredService<ApplicationDbContext>();

            var hasher = scope.ServiceProvider
                .GetRequiredService<IPasswordHasher<AdminUser>>();

            var email = configuration["AdminSeed:Email"];
            var password = configuration["AdminSeed:Password"];
            var name = configuration["AdminSeed:Name"];

            if (string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(password) ||
                string.IsNullOrWhiteSpace(name))
            {
                throw new InvalidOperationException(
                    "AdminSeed configuration is missing.");
            }

            if (await db.AdminUsers.AnyAsync(x => x.Email == email))
                return;

            var admin = new AdminUser
            {
                Name = name,
                Email = email.Trim().ToLowerInvariant(),
                IsActive = true
            };

            admin.PasswordHash = hasher.HashPassword(admin, password);

            db.AdminUsers.Add(admin);
            await db.SaveChangesAsync();
        }
    }
}