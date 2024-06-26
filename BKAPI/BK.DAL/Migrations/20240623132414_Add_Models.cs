using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BK.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Add_Models : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2801b567-75b3-4f28-898f-887d20b4e668");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7339271f-c4ee-4d7c-9916-30b2d3399e56");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "3960bfd6-58d8-4969-9eef-020bf9c5a8cc", "102097ae-8c06-40db-a76b-7fdd515fa61d" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3960bfd6-58d8-4969-9eef-020bf9c5a8cc");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "102097ae-8c06-40db-a76b-7fdd515fa61d");

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Brands_AspNetUsers_ClientId",
                        column: x => x.ClientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobWorkers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FluteRate = table.Column<double>(type: "float", nullable: false),
                    LinerRate = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobWorkers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobWorkers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaperTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BF = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    LaminationPercent = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaperTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PrintTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsOffset = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrintTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BoxName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrandId = table.Column<int>(type: "int", nullable: false),
                    TopPaperTypeId = table.Column<int>(type: "int", nullable: false),
                    FlutePaperTypeId = table.Column<int>(type: "int", nullable: false),
                    BackPaperTypeId = table.Column<int>(type: "int", nullable: false),
                    Length = table.Column<double>(type: "float", nullable: true),
                    Width = table.Column<double>(type: "float", nullable: true),
                    Height = table.Column<double>(type: "float", nullable: true),
                    Flap1 = table.Column<double>(type: "float", nullable: true),
                    Flat2 = table.Column<double>(type: "float", nullable: true),
                    Deckle = table.Column<double>(type: "float", nullable: false),
                    Cutting = table.Column<double>(type: "float", nullable: false),
                    Top = table.Column<int>(type: "int", nullable: false),
                    Flute = table.Column<int>(type: "int", nullable: false),
                    Back = table.Column<int>(type: "int", nullable: false),
                    NoOfSheerPerBox = table.Column<int>(type: "int", nullable: false),
                    PrintTypeId = table.Column<int>(type: "int", nullable: false),
                    PrintingPlate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ply = table.Column<int>(type: "int", nullable: false),
                    PrintRate = table.Column<double>(type: "float", nullable: false),
                    IsLamination = table.Column<bool>(type: "bit", nullable: false),
                    DieCode = table.Column<int>(type: "int", nullable: false),
                    JobWorkerId = table.Column<int>(type: "int", nullable: false),
                    ProfitPercent = table.Column<double>(type: "float", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_JobWorkers_JobWorkerId",
                        column: x => x.JobWorkerId,
                        principalTable: "JobWorkers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Products_PaperTypes_BackPaperTypeId",
                        column: x => x.BackPaperTypeId,
                        principalTable: "PaperTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Products_PaperTypes_FlutePaperTypeId",
                        column: x => x.FlutePaperTypeId,
                        principalTable: "PaperTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Products_PaperTypes_TopPaperTypeId",
                        column: x => x.TopPaperTypeId,
                        principalTable: "PaperTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Products_PrintTypes_PrintTypeId",
                        column: x => x.PrintTypeId,
                        principalTable: "PrintTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsPrimary = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Liners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Liners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Liners_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    JobWorkerRate = table.Column<float>(type: "real", nullable: false),
                    FinalRate = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_AspNetUsers_ClientId",
                        column: x => x.ClientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "12b44759-faef-40e4-bd13-00b7f4e565ea", null, "Client", "CLIENT" },
                    { "1f825165-ece6-457f-8b6a-f4e169072df4", null, "Admin", "ADMIN" },
                    { "930076e3-22df-4676-b3ea-5f056219ee93", null, "JobWorker", "JOBWORKER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "CompanyName", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "IsActivated", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserId", "UserName", "UserPassword", "WhatsappNumber" },
                values: new object[] { "eb4720ce-c18e-4db7-9d49-50d1a0d8f228", 0, "Black Knight Enterprise", "38e277b7-e8ee-48a0-840d-9048f30706e9", new DateTime(2024, 6, 23, 18, 54, 13, 776, DateTimeKind.Local).AddTicks(8630), null, false, true, false, null, null, "ADMIN", "AQAAAAIAAYagAAAAEJUa/JzrL3lczMx0I/gdAWo6xzV9dNtRiNu1AdD30kEJbpEHm5r8U/CwHnpCSI9nuA==", null, false, "c7a2b4b5-0c6d-4af8-a47c-26e97b4a0114", false, "BK_Admin", "admin", "Admin@123", null });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1f825165-ece6-457f-8b6a-f4e169072df4", "eb4720ce-c18e-4db7-9d49-50d1a0d8f228" });

            migrationBuilder.CreateIndex(
                name: "IX_Brands_ClientId",
                table: "Brands",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_ProductId",
                table: "Images",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_JobWorkers_UserId",
                table: "JobWorkers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Liners_ProductId",
                table: "Liners",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ClientId",
                table: "Orders",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ProductId",
                table: "Orders",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_BackPaperTypeId",
                table: "Products",
                column: "BackPaperTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandId",
                table: "Products",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_FlutePaperTypeId",
                table: "Products",
                column: "FlutePaperTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_JobWorkerId",
                table: "Products",
                column: "JobWorkerId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_PrintTypeId",
                table: "Products",
                column: "PrintTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_TopPaperTypeId",
                table: "Products",
                column: "TopPaperTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "Liners");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "JobWorkers");

            migrationBuilder.DropTable(
                name: "PaperTypes");

            migrationBuilder.DropTable(
                name: "PrintTypes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "12b44759-faef-40e4-bd13-00b7f4e565ea");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "930076e3-22df-4676-b3ea-5f056219ee93");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1f825165-ece6-457f-8b6a-f4e169072df4", "eb4720ce-c18e-4db7-9d49-50d1a0d8f228" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f825165-ece6-457f-8b6a-f4e169072df4");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "eb4720ce-c18e-4db7-9d49-50d1a0d8f228");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2801b567-75b3-4f28-898f-887d20b4e668", null, "Client", "CLIENT" },
                    { "3960bfd6-58d8-4969-9eef-020bf9c5a8cc", null, "Admin", "ADMIN" },
                    { "7339271f-c4ee-4d7c-9916-30b2d3399e56", null, "JobWorker", "JOBWORKER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "CompanyName", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "IsActivated", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserId", "UserName", "UserPassword", "WhatsappNumber" },
                values: new object[] { "102097ae-8c06-40db-a76b-7fdd515fa61d", 0, "Black Knight Enterprise", "68ff07e2-c7fa-4fd7-abed-88c3316b8eed", new DateTime(2024, 6, 23, 18, 53, 31, 702, DateTimeKind.Local).AddTicks(3570), null, false, true, false, null, null, "ADMIN", "AQAAAAIAAYagAAAAEDF6s5HQhrkUQBoncVeqovWVi9wlFJlU0nVBvLO4jLsVQafkOC1qRGQvKkeFhL3BxA==", null, false, "b1d4ab93-1ff5-4143-9640-f84ea89b28a3", false, "BK_Admin", "admin", "Admin@123", null });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "3960bfd6-58d8-4969-9eef-020bf9c5a8cc", "102097ae-8c06-40db-a76b-7fdd515fa61d" });
        }
    }
}
