using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class SlackCredsNotUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_SlackCredentials",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SlackCredentials",
                table: "Users",
                column: "SlackCredentials");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_SlackCredentials",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SlackCredentials",
                table: "Users",
                column: "SlackCredentials",
                unique: true);
        }
    }
}
