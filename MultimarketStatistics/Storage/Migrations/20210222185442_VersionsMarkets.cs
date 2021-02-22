using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class VersionsMarkets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Market",
                table: "Versions",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Market",
                table: "Versions");
        }
    }
}
