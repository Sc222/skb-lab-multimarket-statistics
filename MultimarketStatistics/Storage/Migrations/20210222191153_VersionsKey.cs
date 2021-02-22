using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class VersionsKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Versions",
                table: "Versions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Versions",
                table: "Versions",
                columns: new[] { "AppId", "Number", "Market" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Versions",
                table: "Versions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Versions",
                table: "Versions",
                columns: new[] { "AppId", "Number" });
        }
    }
}
