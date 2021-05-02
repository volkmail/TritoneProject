using Microsoft.EntityFrameworkCore.Migrations;

namespace TritonBackend.Migrations
{
    public partial class AddNewColumnInDiagramTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ElementText",
                table: "DiagramElements",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ElementText",
                table: "DiagramElements");
        }
    }
}
