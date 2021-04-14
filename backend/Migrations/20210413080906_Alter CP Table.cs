using Microsoft.EntityFrameworkCore.Migrations;

namespace TritonBackend.Migrations
{
    public partial class AlterCPTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CpName",
                table: "CheckPoints",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CpName",
                table: "CheckPoints");
        }
    }
}
