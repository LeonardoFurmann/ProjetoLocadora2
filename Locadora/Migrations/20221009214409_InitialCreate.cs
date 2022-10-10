using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoLocadora.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alocacoes",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    idUsuario = table.Column<int>(type: "INTEGER", nullable: false),
                    idFilme = table.Column<int>(type: "INTEGER", nullable: false),
                    nomeUsuario = table.Column<string>(type: "TEXT", nullable: false),
                    nomeFilme = table.Column<string>(type: "TEXT", nullable: false),
                    dataAlocacao = table.Column<string>(type: "TEXT", nullable: true),
                    dataDevolucao = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alocacoes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Filmes",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    nome = table.Column<string>(type: "TEXT", nullable: true),
                    diretor = table.Column<string>(type: "TEXT", nullable: true),
                    dataLancamento = table.Column<string>(type: "TEXT", nullable: true),
                    genero = table.Column<string>(type: "TEXT", nullable: true),
                    classIndicativa = table.Column<int>(type: "INTEGER", nullable: false),
                    estaLocado = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Filmes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    nome = table.Column<string>(type: "TEXT", nullable: true),
                    endereco = table.Column<string>(type: "TEXT", nullable: true),
                    idade = table.Column<int>(type: "INTEGER", nullable: false),
                    telefone = table.Column<string>(type: "TEXT", nullable: true),
                    dataCadastro = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Alocacoes");

            migrationBuilder.DropTable(
                name: "Filmes");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
