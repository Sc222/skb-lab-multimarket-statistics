using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Ratings_Apps_AppId",
                "Ratings");

            migrationBuilder.DropForeignKey(
                "FK_Reviews_Apps_AppId",
                "Reviews");

            migrationBuilder.DropIndex(
                "IX_Apps_AppGalleryId",
                "Apps");

            migrationBuilder.DropIndex(
                "IX_Apps_AppStoreId",
                "Apps");

            migrationBuilder.DropIndex(
                "IX_Apps_PlayMarketId",
                "Apps");

            migrationBuilder.AlterColumn<Guid>(
                "AppId",
                "Reviews",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                "AppId",
                "Ratings",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Ratings_Apps_AppId",
                "Ratings");

            migrationBuilder.DropForeignKey(
                "FK_Reviews_Apps_AppId",
                "Reviews");

            migrationBuilder.AlterColumn<Guid>(
                "AppId",
                "Reviews",
                "uuid",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                "AppId",
                "Ratings",
                "uuid",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.CreateIndex(
                "IX_Apps_AppGalleryId",
                "Apps",
                "AppGalleryId",
                unique: true);

            migrationBuilder.CreateIndex(
                "IX_Apps_AppStoreId",
                "Apps",
                "AppStoreId",
                unique: true);

            migrationBuilder.CreateIndex(
                "IX_Apps_PlayMarketId",
                "Apps",
                "PlayMarketId",
                unique: true);

            migrationBuilder.AddForeignKey(
                "FK_Ratings_Apps_AppId",
                "Ratings",
                "AppId",
                "Apps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                "FK_Reviews_Apps_AppId",
                "Reviews",
                "AppId",
                "Apps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}