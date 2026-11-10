using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace STLourdes.Api.Data
{
    public class ApplicationDbContextFactory
        : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>();

            var connectionString =
                "Server=localhost\\SQLEXPRESS;" +
                "Database=STLourdesCollegeDB;" +
                "Trusted_Connection=True;" +
                "TrustServerCertificate=True;";

            options.UseSqlServer(connectionString);

            return new ApplicationDbContext(options.Options);
        }
    }
}
