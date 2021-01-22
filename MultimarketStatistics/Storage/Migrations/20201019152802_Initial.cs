using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "Locales",
                table => new
                {
                    AppId = table.Column<Guid>(nullable: false),
                    Market = table.Column<int>(nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_Locales", x => new {x.AppId, x.Market}); });

            migrationBuilder.CreateTable(
                "Users",
                table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    SlackCredentials = table.Column<string>(nullable: true)
                },
                constraints: table => { table.PrimaryKey("PK_Users", x => x.Id); });

            migrationBuilder.CreateTable(
                "Apps",
                table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    AppGalleryId = table.Column<string>(nullable: true),
                    AppStoreId = table.Column<string>(nullable: true),
                    PlayMarketId = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    PicUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apps", x => x.Id);
                    table.ForeignKey(
                        "FK_Apps_Users_UserId",
                        x => x.UserId,
                        "Users",
                        "Id");
                });

            migrationBuilder.CreateTable(
                "Notifications",
                table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    AppId = table.Column<Guid>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    IsChecked = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        "FK_Notifications_Apps_AppId",
                        x => x.AppId,
                        "Apps",
                        "Id");
                    table.ForeignKey(
                        "FK_Notifications_Users_UserId",
                        x => x.UserId,
                        "Users",
                        "Id");
                });

            migrationBuilder.CreateTable(
                "Ratings",
                table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AppId = table.Column<Guid>(nullable: true),
                    Total = table.Column<int>(nullable: false),
                    FiveStarsCount = table.Column<int>(nullable: false),
                    FourStarsCount = table.Column<int>(nullable: false),
                    ThreeStarsCount = table.Column<int>(nullable: false),
                    TwoStarsCount = table.Column<int>(nullable: false),
                    OneStarsCount = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Market = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                    table.ForeignKey(
                        "FK_Ratings_Apps_AppId",
                        x => x.AppId,
                        "Apps",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                "Reviews",
                table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AppId = table.Column<Guid>(nullable: true),
                    Market = table.Column<int>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    Rating = table.Column<int>(nullable: false),
                    ReviewerUsername = table.Column<string>(nullable: true),
                    Version = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    DevResponse = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        "FK_Reviews_Apps_AppId",
                        x => x.AppId,
                        "Apps",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                "IX_Apps_UserId",
                "Apps",
                "UserId");

            migrationBuilder.CreateIndex(
                "IX_Notifications_AppId",
                "Notifications",
                "AppId");

            migrationBuilder.CreateIndex(
                "IX_Notifications_UserId",
                "Notifications",
                "UserId");

            migrationBuilder.CreateIndex(
                "IX_Ratings_AppId",
                "Ratings",
                "AppId");

            migrationBuilder.CreateIndex(
                "IX_Reviews_AppId",
                "Reviews",
                "AppId");

            migrationBuilder.CreateIndex(
                "IX_Users_Email",
                "Users",
                "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                "IX_Users_SlackCredentials",
                "Users",
                "SlackCredentials",
                unique: true);

            migrationBuilder.CreateIndex(
                "IX_Users_Username",
                "Users",
                "Username",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "Locales");

            migrationBuilder.DropTable(
                "Notifications");

            migrationBuilder.DropTable(
                "Ratings");

            migrationBuilder.DropTable(
                "Reviews");

            migrationBuilder.DropTable(
                "Apps");

            migrationBuilder.DropTable(
                "Users");
        }
    }
}