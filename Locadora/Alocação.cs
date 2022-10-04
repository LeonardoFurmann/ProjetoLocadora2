using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace locadora
{
	class Alocar
    {
    	public int id { get; set; }
		public int idUsuario { get; set; }
    	public int idFilme { get; set; }

        // public string? DataAlocacao = DateTime.Now.ToString();

        // public string? DataDevolucao = DateTime.Now.ToString();


    }

}