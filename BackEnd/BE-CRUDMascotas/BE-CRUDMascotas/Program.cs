using BE_CRUDMascotas.Models;
using BE_CRUDMascotas.Models.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Cors Conexión entre el fronend y backend
builder.Services.AddCors(options => options.AddPolicy("AllowWebapp", 
                                                      builder => builder.AllowAnyOrigin() //Permitir cualquier origen
                                                                        .AllowAnyHeader() //Permitir cualquier cabecera
                                                                        .AllowAnyMethod())); //Permitir cualquier metodo

//Add Context
builder.Services.AddDbContext<AplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"));
});

//Automapper
builder.Services.AddAutoMapper(typeof(Program));

//AddServices
builder.Services.AddScoped<IMascotaRepository , MascotaRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowWebapp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
