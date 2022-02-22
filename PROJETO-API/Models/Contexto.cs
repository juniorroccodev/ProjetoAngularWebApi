using Microsoft.EntityFrameworkCore;

namespace PROJETO_API.Models
{
    public class Contexto : DbContext  //Representação do BD em memoria, mapeia tudo por esse arquivo.
    {
        public DbSet<Pessoa> Pessoas { get; set; } // Representação da nossa tabela do BD

        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {
            
        }
        
    }
}