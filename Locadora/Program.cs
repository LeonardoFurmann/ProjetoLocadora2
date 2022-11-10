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

			//adiciona politica permissiva de cross-origin ao builder
			builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
			
			var app = builder.Build();

			//ativa a politica de cross-origin
			app.UseCors();
			
			//listar todos os usuarios
			app.MapGet("/usuarios", (BaseDados baseUsuarios) => {
				return baseUsuarios.Usuarios.ToList();
			});

			// // usado somente para preencer o atributo dos filmes já cadastrados
			// app.MapGet("/temp", (BaseDados banco) => {
		
			// foreach(Filme filme in banco.Filmes){
			// 		foreach(Alocar alocar in banco.Alocacoes)
			// 			if(alocar.idFilme == filme.id){
			// 			filme.statusFilme = "Está Locado";
			// 			break;
			// 		} else {
			// 		filme.statusFilme = "Disponível";
			// 	}

			// }
			// 		banco.SaveChanges();
			// });


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

			//listar usuario especifico (por nome)
			app.MapGet("/usuario/nome/{nome}", (BaseDados baseUsuarios, String nome) => {
				String retorno = "";

					foreach(Usuario usuario in baseUsuarios.Usuarios){
						if(usuario.nome.Equals(nome)){
							retorno += nome + " - id: " + usuario.id + "\n";
						}
					}


				return retorno;
			});

			//listar filme especifico (por id)
			app.MapGet("/filme/{id}", (BaseDados baseFilmes, int id) => {
				return baseFilmes.Filmes.Find(id);
			});

			//listar filme especifico (por nome)
			app.MapGet("/filme/nome/{nome}", (BaseDados baseFilmes, String nome) => {
					
					String retorno = "";

					foreach(Filme filme in baseFilmes.Filmes){
						if(filme.nome.Equals(nome)){
							retorno += filme.nome + " - id: " + filme.id + "\n";
						}
					}


				return retorno;
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
				filme.statusFilme = "Disponível";
				baseFilmes.Filmes.Add(filme);
				baseFilmes.SaveChanges();
				return "Filme cadastrado!";
			});

			//cadastrar alocação
			app.MapPost("/cadastraraloc", (BaseDados banco, Alocar alocar) =>
				{
					String retorno = " ";
			
						if(verificaFilmeLocado(banco, alocar) == true){							
							retorno = "Filme já está locado. :(";
						} else 
						if (verificaClassificacaoIndicativa(banco, alocar) == false){
								
						retorno = "Idade não corresponde a classificação Indicativa do filme ";

						}else{
							alocar.nomeUsuario = banco.Usuarios.Find(alocar.idUsuario).nome;
							alocar.nomeFilme = banco.Filmes.Find(alocar.idFilme).nome;
							
							alocar.dataAlocacao = DateTime.Now.ToString("dd-MM-yyyy");
							alocar.dataDevolucao = DateTime.Now.AddDays(7).ToString("dd-MM-yyyy");	

							alocar.statusAloc = "Em andamento";

							banco.Filmes.Find(alocar.idFilme).statusFilme = "Está Locado";

							banco.Alocacoes.Add(alocar);
							banco.SaveChanges();
							retorno =  "Alocação cadastrada!";
						}	

				return retorno;	
				
				}
			);

		Boolean verificaFilmeLocado(BaseDados banco, Alocar alocar){
				bool filmeLocado = false;

				if(banco.Filmes.Find(alocar.idFilme).statusFilme.Equals("Disponível")){

					filmeLocado = false;
				} else {
					filmeLocado = true;

				}

				// foreach(Alocar alocacao in banco.Alocacoes){
				// 		if(alocar.idFilme == alocacao.idFilme){ 
				// 			filmeLocado = true;	
				// 			break;			
				// 		} else {
				// 			filmeLocado =  false;
							
				// 		}					
				// }	

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

			//fazer devolução
			app.MapPost("/devolucao/{id}", (BaseDados banco, int id) =>{
				
				 Alocar alocacao = banco.Alocacoes.Find(id);

				alocacao.statusAloc = "Devolvido";

				banco.Filmes.Find(alocacao.idFilme).statusFilme = "Disponível";
				
				banco.SaveChanges();
				return "Devolução feita";

			});



			//atualizar usuario
			app.MapPut("/atualizarusuario/{id}", (BaseDados baseUsuarios, Usuario usuarioAtualizado, int id) =>
			{
				var usuario = baseUsuarios.Usuarios.Find(id);
				usuario.endereco = usuarioAtualizado.endereco;
				usuario.nome = usuarioAtualizado.nome;
				usuario.email = usuarioAtualizado.email;
				usuario.telefone = usuarioAtualizado.telefone;
				usuario.idade = usuarioAtualizado.idade;
				usuario.dataCadastro= usuarioAtualizado.dataCadastro;


				baseUsuarios.SaveChanges();
				return "Usuario atualizado.";
			});

			//atualizar filme
			app.MapPut("/atualizarfilme/{id}", (BaseDados baseFilmes, Filme filmeAtualizado, int id) =>
			{
				var filme = baseFilmes.Filmes.Find(id);
				filme.nome = filmeAtualizado.nome;
				filme.diretor = filmeAtualizado.diretor;
				filme.dataLancamento = filmeAtualizado.dataLancamento;
				filme.genero = filmeAtualizado.genero;
				filme.classIndicativa = filmeAtualizado.classIndicativa;
				filme.statusFilme = filmeAtualizado.statusFilme;

				baseFilmes.SaveChanges();
				return "Filme atualizado.";
			});

			//atualizar alocação
			app.MapPut("/atualizaralocacao/{id}", (BaseDados baseAlocacoes, Alocar alocacaoAtualizado, int id) =>
			{
				var alocacao = baseAlocacoes.Alocacoes.Find(id);
				alocacao.idUsuario = alocacaoAtualizado.idUsuario;
				alocacao.idFilme = alocacaoAtualizado.idFilme;
				alocacao.dataAlocacao = alocacaoAtualizado.dataAlocacao;
				alocacao.dataDevolucao = alocacaoAtualizado.dataDevolucao;
				alocacao.nomeFilme = alocacaoAtualizado.nomeFilme;
				alocacao.nomeUsuario  = alocacaoAtualizado.nomeUsuario;

				baseAlocacoes.SaveChanges();
				return "Alocação atualizada.";
			});
						
			//deletar usuario
			app.MapDelete("/deletarusuario/{id}", (BaseDados baseUsuarios, int id) =>
			{
				var usuario = baseUsuarios.Usuarios.Find(id);
				baseUsuarios.Remove(usuario);
				baseUsuarios.SaveChanges();
				return "Usuario deletado.";
			});

			//deletar filme
			app.MapDelete("/deletarfilme/{id}", (BaseDados baseFilmes, int id) =>
			{
				var filme = baseFilmes.Filmes.Find(id);
				baseFilmes.Remove(filme);
				baseFilmes.SaveChanges();
				return "Filme deletado.";
			});

			//deletar alocação
			app.MapDelete("/deletaralocacao/{id}", (BaseDados baseAlocacoes, int id) =>
			{
				var alocacao = baseAlocacoes.Alocacoes.Find(id);
				baseAlocacoes.Remove(alocacao);
				baseAlocacoes.SaveChanges();
				return "Alocação deletada.";
			});
						
			app.Run("http://localhost:3000");;
		}
	}
}