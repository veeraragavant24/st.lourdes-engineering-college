using Microsoft.EntityFrameworkCore;
using STLourdes.Api.Models;

namespace STLourdes.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

        public DbSet<NewsEvent> NewsEvents => Set<NewsEvent>();
    }
}