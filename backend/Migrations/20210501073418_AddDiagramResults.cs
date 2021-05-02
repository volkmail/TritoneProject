using Microsoft.EntityFrameworkCore.Migrations;

namespace TritonBackend.Migrations
{
    public partial class AddDiagramResults : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DiagramResults",
                columns: table => new
                {
                    DiagramResultId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResultId = table.Column<int>(type: "int", nullable: false),
                    step1 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    step2 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    step3 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    step4 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    step5 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    step6 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    step7 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    step8 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiagramResults", x => x.DiagramResultId);
                    table.ForeignKey(
                        name: "FK_DiagramResults_Results_ResultId",
                        column: x => x.ResultId,
                        principalTable: "Results",
                        principalColumn: "ResultId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DiagramResults_ResultId",
                table: "DiagramResults",
                column: "ResultId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DiagramResults");
        }
    }
}
