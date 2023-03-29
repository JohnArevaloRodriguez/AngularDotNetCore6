using AutoMapper;
using BE_CRUDMascotas.Models.DTO;

namespace BE_CRUDMascotas.Models.Profiles
{
    public class MascotaProfile : Profile
    {
        public MascotaProfile()
        {
            CreateMap<Mascota, MascotaDTO>(); //Mapear desde el modelo asi el DTO
            CreateMap<MascotaDTO, Mascota>(); //tambien se tiene que hacer de la forma inversa
        }
    }
}
