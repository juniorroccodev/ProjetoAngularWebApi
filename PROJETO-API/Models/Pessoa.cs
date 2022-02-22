using Microsoft.EntityFrameworkCore;

namespace PROJETO_API.Models


{
       public class Pessoa   
    {
        public int PessoaId { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; } 
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Sexo { get; set; }
        public string DataNascimento { get; set; }
        
    }
}