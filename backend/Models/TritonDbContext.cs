using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TritonBackend.Models
{
    public class TritonDbContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<DataSet> DataSets { get; set; }
        public DbSet<CheckPoint> CheckPoints { get; set; }
        public DbSet<DiagramElement> DiagramElements { get; set; }
        
        public TritonDbContext(DbContextOptions<TritonDbContext> options)
        : base(options)
        {
        }
    }
}
