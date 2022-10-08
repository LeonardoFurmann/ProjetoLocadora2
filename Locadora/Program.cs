using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace locadora
{

	
	class BaseDados : DbContext
	{
		public BaseDados(DbContextOptions options) : base(options)
		{}
		
		public DbSet<Usuario> Usuarios { get; set; } = null!;
        public DbSet<Filme> Filmes { get; set; } = null!;
		public DbSet<Alocar> Alocacoes { get; set; } = null!;
		
	}

	class Program
	{
	
		static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			
			var connectionString = builder.Configuration.GetConnectionString("Usuarios") ?? "Data Source=Usuarios.db";
            connectionString = builder.Configuration.GetConnectionString("Filmes") ?? "Data Source=Filmes.db";
			connectionString = builder.Configuration.GetConnectionString("Alocações") ?? "Data Source=Alocs.db";
			builder.Services.AddSqlite<BaseDados>(connectionString);
			var app = builder.Build();
			
			//listar todos os usuarios
			app.MapGet("/usuarios", (BaseDados baseUsuarios) => {
				return baseUsuarios.Usuarios.ToList();
			});

			//listar todos os filmes
			app.MapGet("/filmes", (BaseDados baseFilmes) => {
				return baseFilmes.Filmes.ToList();
			});

			//listar todos as alocações
			app.MapGet("/alocacoes", (BaseDados baseAlocacoes) => {
				return baseAlocacoes.Alocacoes.ToList();
			});
			
			//listar usuario especifico (por id)
			app.MapGet("/usuario/{id}", (BaseDados baseUsuarios, int id) => {
				return baseUsuarios.Usuarios.Find(id);
			});

			//listar filme especifico (por id)
			app.MapGet("/filme/{id}", (BaseDados baseFilmes, int id) => {
				return baseFilmes.Filmes.Find(id);
			});

			//listar alocação especifica (por id)
			app.MapGet("/alocacao/{id}", (BaseDados baseAlocacoes, int id) => {
				return baseAlocacoes.Alocacoes.Find(id);
			});
			
			//cadastrar usuario
			app.MapPost("/cadastrarusuario", (BaseDados baseUsuarios, Usuario usuario) =>
			{
				baseUsuarios.Usuarios.Add(usuario);
				baseUsuarios.SaveChanges();
				return "Usuário cadastrado!";
			});

			//cadastrar filme
			app.MapPost("/cadastrarfilme", (BaseDados baseFilmes, Filme filme) =>
			{
				baseFilmes.Filmes.Add(filme);
				baseFilmes.SaveChanges();
				return "Filme cadastrado!";
			});

			//cadastrar alocação
			app.MapPost("/cadastraraloc", (BaseDados banco, Alocar alocar) =>
				{
					String retorno = " ";
			
						if(verificaFilmeLocado(banco, alocar)){							
							retorno = "Filme já está locado. :(";
						} else 
						if (verificaClassificacaoIndicativa(banco, alocar) == false){
								
						retorno = "Idade não corresponde a classificação Indicativa do filme ";

						}else{
							banco.Alocacoes.Add(alocar);
							banco.SaveChanges();
							retorno =  "Alocação cadastrada!";
						}	

				return retorno;	
				
				}
			);

		Boolean verificaFilmeLocado(BaseDados banco, Alocar alocar){
				bool filmeLocado = false;

				foreach(Alocar alocacao in banco.Alocacoes){
						if(alocar.idFilme == alocacao.idFilme){ //banco
							filmeLocado = true;
						} else {
							filmeLocado =  false;
							
						}
				}	

				return filmeLocado;	
			}

		Boolean verificaClassificacaoIndicativa(BaseDados banco, Alocar alocar){
			bool idadeCorrete = false;

			int idade = banco.Usuarios.Find((alocar.idUsuario)).idade;
			int cI = banco.Filmes.Find((alocar.idFilme)).classIndicativa;
			
			if( idade >= cI) { 
				idadeCorrete = true;
			} else{
				idadeCorrete = false;
			}

			return idadeCorrete;
		}
			
			//atualizar usuario
			app.MapPost("/atualizarusuario/{id}", (BaseDados baseUsuarios, Usuario usuarioAtualizado, int id) =>
			{
				var usuario = baseUsuarios.Usuarios.Find(id);
				usuario.endereco = usuarioAtualizado.endereco;
				usuario.nome = usuarioAtualizado.nome;
				usuario.telefone = usuarioAtualizado.telefone;
				usuario.idade = usuarioAtualizado.idade;
				usuario.dataCadastro= usuarioAtualizado.dataCadastro;


				baseUsuarios.SaveChanges();
				return "Usuario atualizado.";
			});

			//atualizar filme
			app.MapPost("/atualizarfilme/{id}", (BaseDados baseFilmes, Filme filmeAtualizado, int id) =>
			{
				var filme = baseFilmes.Filmes.Find(id);
				filme.nome = filmeAtualizado.nome;
				filme.diretor = filmeAtualizado.diretor;
				filme.dataLancamento = filmeAtualizado.dataLancamento;
				filme.genero = filmeAtualizado.genero;
				filme.classIndicativa = filmeAtualizado.classIndicativa;
				baseFilmes.SaveChanges();
				return "Filme atualizado.";
			});

			//atualizar alocação
			app.MapPost("/atualizaralocacao/{id}", (BaseDados baseAlocacoes, Alocar alocacaoAtualizado, int id) =>
			{
				var alocacao = baseAlocacoes.Alocacoes.Find(id);
				alocacao.idUsuario = alocacaoAtualizado.idUsuario;
				alocacao.idFilme = alocacaoAtualizado.idFilme;
				alocacao.dataAlocacao = alocacaoAtualizado.dataAlocacao;
				alocacao.dataDevolucao = alocacaoAtualizado.dataDevolucao;

				baseAlocacoes.SaveChanges();
				return "Alocação atualizada.";
			});
						
			//deletar usuario
			app.MapPost("/deletarusuario/{id}", (BaseDados baseUsuarios, int id) =>
			{
				var usuario = baseUsuarios.Usuarios.Find(id);
				baseUsuarios.Remove(usuario);
				baseUsuarios.SaveChanges();
				return "Usuario deletado.";
			});

			//deletar filme
			app.MapPost("/deletarfilme/{id}", (BaseDados baseFilmes, int id) =>
			{
				var filme = baseFilmes.Filmes.Find(id);
				baseFilmes.Remove(filme);
				baseFilmes.SaveChanges();
				return "Filme deletado.";
			});

			//deletar alocação
			app.MapPost("/deletaralocacao/{id}", (BaseDados baseAlocacoes, int id) =>
			{
				var alocacao = baseAlocacoes.Alocacoes.Find(id);
				baseAlocacoes.Remove(alocacao);
				baseAlocacoes.SaveChanges();
				return "Alocação deletada.";
			});
						
			app.Run();
		}
	}
}