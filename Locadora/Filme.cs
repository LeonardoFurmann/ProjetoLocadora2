using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace locadora
{
	
	class Filme
    {
    	public int id { get; set; }
		public string? nome { get; set; }
    	public string? diretor { get; set; }
        public string? dataLancamento { get; set; }
        public string? genero { get; set; }   
        public int classIndicativa { get; set; }

       public string statusFilme { get; set; }

        
    }
}

