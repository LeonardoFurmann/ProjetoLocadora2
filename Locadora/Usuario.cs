using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace locadora
{
	class Usuario
    {
    	public int id { get; set; }
		public string? nome { get; set; }
    	public string? endereco { get; set; }
        public int idade { get; set; }
        public string? telefone { get; set; }     
        public string? email { get; set; }
        public string? dataCadastro  { get; set; }
    
    }
}