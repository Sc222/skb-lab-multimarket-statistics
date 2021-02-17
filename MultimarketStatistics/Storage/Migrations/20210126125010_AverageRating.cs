using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class AverageRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FiveStarsCount",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "FourStarsCount",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "OneStarsCount",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "ThreeStarsCount",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "TwoStarsCount",
                table: "Ratings");

            migrationBuilder.AddColumn<double>(
                name: "AverageRating",
                table: "Ratings",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "Ratings");

            migrationBuilder.AddColumn<int>(
                name: "FiveStarsCount",
                table: "Ratings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FourStarsCount",
                table: "Ratings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OneStarsCount",
                table: "Ratings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ThreeStarsCount",
                table: "Ratings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Total",
                table: "Ratings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TwoStarsCount",
                table: "Ratings",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
