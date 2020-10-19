using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locales",
                columns: table => new
                {
                    AppId = table.Column<Guid>(nullable: false),
                    Market = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locales", x => new { x.AppId, x.Market });
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    SlackCredentials = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Apps",
                columns: table => new
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
                        name: "FK_Apps_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
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
                        name: "FK_Notifications_Apps_AppId",
                        column: x => x.AppId,
                        principalTable: "Apps",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
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
                        name: "FK_Ratings_Apps_AppId",
                        column: x => x.AppId,
                        principalTable: "Apps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
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
                        name: "FK_Reviews_Apps_AppId",
                        column: x => x.AppId,
                        principalTable: "Apps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Apps_UserId",
                table: "Apps",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_AppId",
                table: "Notifications",
                column: "AppId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_AppId",
                table: "Ratings",
                column: "AppId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AppId",
                table: "Reviews",
                column: "AppId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SlackCredentials",
                table: "Users",
                column: "SlackCredentials",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Locales");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Apps");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
