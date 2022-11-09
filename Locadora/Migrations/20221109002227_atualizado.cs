using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoLocadora.Migrations
{
    public partial class atualizado : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Usuarios",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                table: "Usuarios");
        }
    }
}
