using Microsoft.EntityFrameworkCore.Migrations;

namespace TritonBackend.Migrations
{
    public partial class testingResultChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TestingResults_QuizId",
                table: "TestingResults");

            migrationBuilder.AddColumn<int>(
                name: "TestingResultId",
                table: "Quizzes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TestingResults_QuizId",
                table: "TestingResults",
                column: "QuizId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TestingResults_QuizId",
                table: "TestingResults");

            migrationBuilder.DropColumn(
                name: "TestingResultId",
                table: "Quizzes");

            migrationBuilder.CreateIndex(
                name: "IX_TestingResults_QuizId",
                table: "TestingResults",
                column: "QuizId",
                unique: true);
        }
    }
}
