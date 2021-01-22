using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class NotificationUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                "UserForeignKey",
                "Notifications",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                "IX_Notifications_UserForeignKey",
                "Notifications",
                "UserForeignKey");

            migrationBuilder.AddForeignKey(
                "FK_Notifications_Users_UserForeignKey",
                "Notifications",
                "UserForeignKey",
                "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Notifications_Users_UserForeignKey",
                "Notifications");

            migrationBuilder.DropIndex(
                "IX_Notifications_UserForeignKey",
                "Notifications");

            migrationBuilder.DropColumn(
                "UserForeignKey",
                "Notifications");
        }
    }
}