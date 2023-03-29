using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Models
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options) 
        { 

        }

        //Por cada tabla se debe hacer un DbSet
        public DbSet<Mascota> Mascotas { get; set; }
    }
}
