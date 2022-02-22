using System.Buffers;
using System;
using System.Collections.Immutable;
using Microsoft.EntityFrameworkCore;
using PROJETO_API.Models;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PROJETO-API", Version = "v1" });
            });


builder.Services.AddDbContext<Contexto>(o => 
    o.UseNpgsql(builder.Configuration.GetConnectionString("ConexaoSql"), options => options.SetPostgresVersion(9,5)));

builder.Services.AddCors();    //Habilitando o Cors.


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI(c => 
    {
        c.RoutePrefix = string.Empty;
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PROJETO-API v1");
    
    }
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Aquisições sendo aceitas de qualquer origem
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.Run();

}