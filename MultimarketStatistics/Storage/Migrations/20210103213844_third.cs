using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Apps_AppId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Apps_AppId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Apps_AppGalleryId",
                table: "Apps");

            migrationBuilder.DropIndex(
                name: "IX_Apps_AppStoreId",
                table: "Apps");

            migrationBuilder.DropIndex(
                name: "IX_Apps_PlayMarketId",
                table: "Apps");

            migrationBuilder.AlterColumn<Guid>(
                name: "AppId",
                table: "Reviews",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "AppId",
                table: "Ratings",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Apps_AppId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Apps_AppId",
                table: "Reviews");

            migrationBuilder.AlterColumn<Guid>(
                name: "AppId",
                table: "Reviews",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                name: "AppId",
                table: "Ratings",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.CreateIndex(
                name: "IX_Apps_AppGalleryId",
                table: "Apps",
                column: "AppGalleryId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Apps_AppStoreId",
                table: "Apps",
                column: "AppStoreId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Apps_PlayMarketId",
                table: "Apps",
                column: "PlayMarketId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Apps_AppId",
                table: "Ratings",
                column: "AppId",
                principalTable: "Apps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Apps_AppId",
                table: "Reviews",
                column: "AppId",
                principalTable: "Apps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
