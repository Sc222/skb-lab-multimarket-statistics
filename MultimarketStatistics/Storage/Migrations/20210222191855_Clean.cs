using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class Clean : Migration
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
                name: "Versions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Number = table.Column<string>(nullable: true),
                    AppId = table.Column<Guid>(nullable: false),
                    Market = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Versions", x => x.Id);
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
                    UserForeignKey = table.Column<Guid>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    PicUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Apps_Users_UserForeignKey",
                        column: x => x.UserForeignKey,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AppForeignKey = table.Column<Guid>(nullable: false),
                    UserForeignKey = table.Column<Guid>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    IsChecked = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Apps_AppForeignKey",
                        column: x => x.AppForeignKey,
                        principalTable: "Apps",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserForeignKey",
                        column: x => x.UserForeignKey,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AppForeignKey = table.Column<Guid>(nullable: false),
                    AverageRating = table.Column<double>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Market = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ratings_Apps_AppForeignKey",
                        column: x => x.AppForeignKey,
                        principalTable: "Apps",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AppForeignKey = table.Column<Guid>(nullable: false),
                    Market = table.Column<int>(nullable: false),
                    MarketReviewId = table.Column<string>(nullable: true),
                    Text = table.Column<string>(nullable: true),
                    Rating = table.Column<int>(nullable: false),
                    ReviewerUsername = table.Column<string>(nullable: true),
                    Version = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    DevResponse = table.Column<string>(nullable: true),
                    IsChecked = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_Apps_AppForeignKey",
                        column: x => x.AppForeignKey,
                        principalTable: "Apps",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Apps_UserForeignKey",
                table: "Apps",
                column: "UserForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_AppForeignKey",
                table: "Notifications",
                column: "AppForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserForeignKey",
                table: "Notifications",
                column: "UserForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_AppForeignKey",
                table: "Ratings",
                column: "AppForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AppForeignKey",
                table: "Reviews",
                column: "AppForeignKey");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SlackCredentials",
                table: "Users",
                column: "SlackCredentials");

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
                name: "Versions");

            migrationBuilder.DropTable(
                name: "Apps");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
