using Microsoft.EntityFrameworkCore.Migrations;

namespace TritonBackend.Migrations
{
    public partial class CalcResultAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_DataSets_DataSetId",
                table: "Results");

            migrationBuilder.DropTable(
                name: "DataSets");

            migrationBuilder.DropIndex(
                name: "IX_Results_DataSetId",
                table: "Results");

            migrationBuilder.DropColumn(
                name: "DataSetId",
                table: "Results");

            migrationBuilder.CreateTable(
                name: "CalculationResults",
                columns: table => new
                {
                    CalculationResultId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CalculationResult = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResultId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalculationResults", x => x.CalculationResultId);
                    table.ForeignKey(
                        name: "FK_CalculationResults_Results_ResultId",
                        column: x => x.ResultId,
                        principalTable: "Results",
                        principalColumn: "ResultId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CalculationResults_ResultId",
                table: "CalculationResults",
                column: "ResultId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CalculationResults");

            migrationBuilder.AddColumn<int>(
                name: "DataSetId",
                table: "Results",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DataSets",
                columns: table => new
                {
                    DataSetId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataSetPath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSets", x => x.DataSetId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Results_DataSetId",
                table: "Results",
                column: "DataSetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_DataSets_DataSetId",
                table: "Results",
                column: "DataSetId",
                principalTable: "DataSets",
                principalColumn: "DataSetId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
