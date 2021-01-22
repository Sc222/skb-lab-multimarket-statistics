using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Notifications_Users_UserId",
                "Notifications");

            migrationBuilder.DropIndex(
                "IX_Notifications_UserId",
                "Notifications");

            migrationBuilder.DropColumn(
                "UserId",
                "Notifications");

            migrationBuilder.AddColumn<string>(
                "MarketReviewId",
                "Reviews",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "MarketReviewId",
                "Reviews");

            migrationBuilder.AddColumn<Guid>(
                "UserId",
                "Notifications",
                "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                "IX_Notifications_UserId",
                "Notifications",
                "UserId");

            migrationBuilder.AddForeignKey(
                "FK_Notifications_Users_UserId",
                "Notifications",
                "UserId",
                "Users",
                principalColumn: "Id");
        }
    }
}