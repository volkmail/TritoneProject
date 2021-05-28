using Microsoft.EntityFrameworkCore;

namespace TritonBackend.Models
{
    public class TritonDbContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<CalculationResults> CalculationResults { get; set; }
        public DbSet<DiagramElement> DiagramElements { get; set; }
        public DbSet<DiagramResults> DiagramResults { get; set; }
        
        public TritonDbContext(DbContextOptions<TritonDbContext> options)
        : base(options)
        {
        }
    }
}
