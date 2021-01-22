using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class fourth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Apps_Users_UserId",
                "Apps");

            migrationBuilder.DropForeignKey(
                "FK_Notifications_Apps_AppId",
                "Notifications");

            migrationBuilder.DropForeignKey(
                "FK_Ratings_Apps_AppId",
                "Ratings");

            migrationBuilder.DropForeignKey(
                "FK_Reviews_Apps_AppId",
                "Reviews");

            migrationBuilder.DropIndex(
                "IX_Reviews_AppId",
                "Reviews");

            migrationBuilder.DropIndex(
                "IX_Ratings_AppId",
                "Ratings");

            migrationBuilder.DropIndex(
                "IX_Notifications_AppId",
                "Notifications");

            migrationBuilder.DropIndex(
                "IX_Apps_UserId",
                "Apps");

            migrationBuilder.DropColumn(
                "AppId",
                "Reviews");

            migrationBuilder.DropColumn(
                "AppId",
                "Ratings");

            migrationBuilder.DropColumn(
                "AppId",
                "Notifications");

            migrationBuilder.DropColumn(
                "UserId",
                "Apps");

            migrationBuilder.AddColumn<Guid>(
                "AppForeignKey",
                "Reviews",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                "AppForeignKey",
                "Ratings",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                "AppForeignKey",
                "Notifications",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                "UserForeignKey",
                "Apps",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                "IX_Reviews_AppForeignKey",
                "Reviews",
                "AppForeignKey");

            migrationBuilder.CreateIndex(
                "IX_Ratings_AppForeignKey",
                "Ratings",
                "AppForeignKey");

            migrationBuilder.CreateIndex(
                "IX_Notifications_AppForeignKey",
                "Notifications",
                "AppForeignKey");

            migrationBuilder.CreateIndex(
                "IX_Apps_UserForeignKey",
                "Apps",
                "UserForeignKey");

            migrationBuilder.AddForeignKey(
                "FK_Apps_Users_UserForeignKey",
                "Apps",
                "UserForeignKey",
                "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                "FK_Notifications_Apps_AppForeignKey",
                "Notifications",
                "AppForeignKey",
                "Apps",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                "FK_Ratings_Apps_AppForeignKey",
                "Ratings",
                "AppForeignKey",
                "Apps",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                "FK_Reviews_Apps_AppForeignKey",
                "Reviews",
                "AppForeignKey",
                "Apps",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Apps_Users_UserForeignKey",
                "Apps");

            migrationBuilder.DropForeignKey(
                "FK_Notifications_Apps_AppForeignKey",
                "Notifications");

            migrationBuilder.DropForeignKey(
                "FK_Ratings_Apps_AppForeignKey",
                "Ratings");

            migrationBuilder.DropForeignKey(
                "FK_Reviews_Apps_AppForeignKey",
                "Reviews");

            migrationBuilder.DropIndex(
                "IX_Reviews_AppForeignKey",
                "Reviews");

            migrationBuilder.DropIndex(
                "IX_Ratings_AppForeignKey",
                "Ratings");

            migrationBuilder.DropIndex(
                "IX_Notifications_AppForeignKey",
                "Notifications");

            migrationBuilder.DropIndex(
                "IX_Apps_UserForeignKey",
                "Apps");

            migrationBuilder.DropColumn(
                "AppForeignKey",
                "Reviews");

            migrationBuilder.DropColumn(
                "AppForeignKey",
                "Ratings");

            migrationBuilder.DropColumn(
                "AppForeignKey",
                "Notifications");

            migrationBuilder.DropColumn(
                "UserForeignKey",
                "Apps");

            migrationBuilder.AddColumn<Guid>(
                "AppId",
                "Reviews",
                "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                "AppId",
                "Ratings",
                "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                "AppId",
                "Notifications",
                "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                "UserId",
                "Apps",
                "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                "IX_Reviews_AppId",
                "Reviews",
                "AppId");

            migrationBuilder.CreateIndex(
                "IX_Ratings_AppId",
                "Ratings",
                "AppId");

            migrationBuilder.CreateIndex(
                "IX_Notifications_AppId",
                "Notifications",
                "AppId");

            migrationBuilder.CreateIndex(
                "IX_Apps_UserId",
                "Apps",
                "UserId");

            migrationBuilder.AddForeignKey(
                "FK_Apps_Users_UserId",
                "Apps",
                "UserId",
                "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                "FK_Notifications_Apps_AppId",
                "Notifications",
                "AppId",
                "Apps",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                "FK_Ratings_Apps_AppId",
                "Ratings",
                "AppId",
                "Apps",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                "FK_Reviews_Apps_AppId",
                "Reviews",
                "AppId",
                "Apps",
                principalColumn: "Id");
        }
    }
}