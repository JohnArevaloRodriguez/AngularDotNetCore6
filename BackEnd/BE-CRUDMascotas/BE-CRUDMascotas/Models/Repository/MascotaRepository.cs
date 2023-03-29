//La clase es la implementación
//responsable de accesder al controllador
using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Models.Repository
{
    public class MascotaRepository: IMascotaRepository
    {
        private readonly AplicationDbContext _context;
        public MascotaRepository(AplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Mascota>> GetListMascotas()
        {
            return await _context.Mascotas.ToListAsync();            
        }

        public async Task<Mascota> GetMascota(int id)
        {
            var mascota = await _context.Mascotas.FindAsync(id);

            return mascota;
        }

        public async Task deleteMascota(Mascota mascota)
        {
            _context.Mascotas.Remove(mascota);
            await _context.SaveChangesAsync();
        }

        public async Task<Mascota> AddMascota(Mascota mascota)
        {
            _context.Add(mascota);
            await _context.SaveChangesAsync();

            return mascota;
        }

        public async Task UpdateMascota(Mascota mascota)
        {

            var mascotaItem = await _context.Mascotas.FirstOrDefaultAsync(x => x.Id == mascota.Id);

            if (mascotaItem != null)
            {
                mascotaItem.Nombre = mascota.Nombre;
                mascotaItem.Raza = mascota.Raza;
                mascotaItem.Edad = mascota.Edad;
                mascotaItem.Color = mascota.Color;
                mascotaItem.Peso = mascota.Peso;

                await _context.SaveChangesAsync();
            }
        }
    }
}
