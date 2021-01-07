using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class NotificationUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserForeignKey",
                table: "Notifications",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserForeignKey",
                table: "Notifications",
                column: "UserForeignKey");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_UserForeignKey",
                table: "Notifications",
                column: "UserForeignKey",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_UserForeignKey",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_UserForeignKey",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "UserForeignKey",
                table: "Notifications");
        }
    }
}
