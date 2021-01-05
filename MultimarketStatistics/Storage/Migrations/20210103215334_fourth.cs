using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class fourth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Apps_Users_UserId",
                table: "Apps");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Apps_AppId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Apps_AppId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Apps_AppId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_AppId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_AppId",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_AppId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Apps_UserId",
                table: "Apps");

            migrationBuilder.DropColumn(
                name: "AppId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "AppId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "AppId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Apps");

            migrationBuilder.AddColumn<Guid>(
                name: "AppForeignKey",
                table: "Reviews",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AppForeignKey",
                table: "Ratings",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AppForeignKey",
                table: "Notifications",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserForeignKey",
                table: "Apps",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AppForeignKey",
                table: "Reviews",
                column: "AppForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_AppForeignKey",
                table: "Ratings",
                column: "AppForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_AppForeignKey",
                table: "Notifications",
                column: "AppForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_Apps_UserForeignKey",
                table: "Apps",
                column: "UserForeignKey");

            migrationBuilder.AddForeignKey(
                name: "FK_Apps_Users_UserForeignKey",
                table: "Apps",
                column: "UserForeignKey",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Apps_AppForeignKey",
                table: "Notifications",
                column: "AppForeignKey",
                principalTable: "Apps",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Apps_AppForeignKey",
                table: "Ratings",
                column: "AppForeignKey",
                principalTable: "Apps",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Apps_AppForeignKey",
                table: "Reviews",
                column: "AppForeignKey",
                principalTable: "Apps",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Apps_Users_UserForeignKey",
                table: "Apps");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Apps_AppForeignKey",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Apps_AppForeignKey",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Apps_AppForeignKey",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_AppForeignKey",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_AppForeignKey",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_AppForeignKey",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Apps_UserForeignKey",
                table: "Apps");

            migrationBuilder.DropColumn(
                name: "AppForeignKey",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "AppForeignKey",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "AppForeignKey",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "UserForeignKey",
                table: "Apps");

            migrationBuilder.AddColumn<Guid>(
                name: "AppId",
                table: "Reviews",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AppId",
                table: "Ratings",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AppId",
                table: "Notifications",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Apps",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AppId",
                table: "Reviews",
                column: "AppId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_AppId",
                table: "Ratings",
                column: "AppId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_AppId",
                table: "Notifications",
                column: "AppId");

            migrationBuilder.CreateIndex(
                name: "IX_Apps_UserId",
                table: "Apps",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Apps_Users_UserId",
                table: "Apps",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Apps_AppId",
                table: "Notifications",
                column: "AppId",
                principalTable: "Apps",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Apps_AppId",
                table: "Ratings",
                column: "AppId",
                principalTable: "Apps",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Apps_AppId",
                table: "Reviews",
                column: "AppId",
                principalTable: "Apps",
                principalColumn: "Id");
        }
    }
}
