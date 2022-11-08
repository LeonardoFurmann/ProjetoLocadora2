using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoLocadora.Migrations
{
    public partial class MigracaoNova : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "estaLocado",
                table: "Filmes",
                newName: "statusFilme");

            migrationBuilder.AddColumn<string>(
                name: "statusAloc",
                table: "Alocacoes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "statusAloc",
                table: "Alocacoes");

            migrationBuilder.RenameColumn(
                name: "statusFilme",
                table: "Filmes",
                newName: "estaLocado");
        }
    }
}
