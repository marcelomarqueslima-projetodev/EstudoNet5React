using EstudoNet5React.Mapping;
using EstudoNet5React.Models;
using Microsoft.EntityFrameworkCore;

namespace EstudoNet5React.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        public DbSet<City> City { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CityMapping());
            base.OnModelCreating(modelBuilder);
        }
    }
}
