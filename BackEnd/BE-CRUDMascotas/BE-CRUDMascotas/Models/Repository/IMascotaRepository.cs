//La interfaces va ser un contrato que tiene que hacer
//La interfaces me dice que hacer
namespace BE_CRUDMascotas.Models.Repository
{
    public interface IMascotaRepository
    {
        Task<List<Mascota>> GetListMascotas();
        Task<Mascota> GetMascota(int id);
        Task deleteMascota(Mascota mascota);
        Task<Mascota> AddMascota(Mascota mascota);
        Task UpdateMascota(Mascota mascota);
    }
}
