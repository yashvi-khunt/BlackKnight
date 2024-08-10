using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BK.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Update_Type_Of_NoOfSheetsPerBox : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "942e70c5-cfbd-4ae6-9ee5-08be1fc5225e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fab5e2cc-78d5-4abd-8ed9-76f4c4398fd1");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "3064abfd-e740-4218-9fd6-05c79f9ded85", "189d1231-9f34-4b1f-bd58-2175842c4274" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3064abfd-e740-4218-9fd6-05c79f9ded85");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "189d1231-9f34-4b1f-bd58-2175842c4274");

            migrationBuilder.AlterColumn<double>(
                name: "NoOfSheetPerBox",
                table: "Products",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3337590a-f9f7-4d3a-8ee6-4d7221e5feb9", null, "JobWorker", "JOBWORKER" },
                    { "b0d33318-f5b5-4ae9-b10b-98de3705f2ef", null, "Admin", "ADMIN" },
                    { "ed9b53ae-074d-491e-8db9-4b666afc8142", null, "Client", "CLIENT" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "CompanyName", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "GSTNumber", "IsActivated", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserPassword" },
                values: new object[] { "c8c4936d-6f47-4dd8-aad4-19513f80e62e", 0, "Black Knight Enterprise", "b8b498ea-9ba1-451f-bf8c-28a1909b85d9", new DateTime(2024, 8, 3, 12, 52, 56, 811, DateTimeKind.Local).AddTicks(8430), null, false, null, true, false, null, null, "ADMIN", "AQAAAAIAAYagAAAAEH2bzB/l/KNJ4Xp8J5LQ7t08otDDiB0g2VuQT3M3Mg5G+sQk8PdofM6s4FQvMUJ+lA==", null, false, "4f4a717a-15d0-4f0a-af0e-df3b826c9837", false, "admin", "Admin@123" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "b0d33318-f5b5-4ae9-b10b-98de3705f2ef", "c8c4936d-6f47-4dd8-aad4-19513f80e62e" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3337590a-f9f7-4d3a-8ee6-4d7221e5feb9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ed9b53ae-074d-491e-8db9-4b666afc8142");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "b0d33318-f5b5-4ae9-b10b-98de3705f2ef", "c8c4936d-6f47-4dd8-aad4-19513f80e62e" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b0d33318-f5b5-4ae9-b10b-98de3705f2ef");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c8c4936d-6f47-4dd8-aad4-19513f80e62e");

            migrationBuilder.AlterColumn<int>(
                name: "NoOfSheetPerBox",
                table: "Products",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3064abfd-e740-4218-9fd6-05c79f9ded85", null, "Admin", "ADMIN" },
                    { "942e70c5-cfbd-4ae6-9ee5-08be1fc5225e", null, "JobWorker", "JOBWORKER" },
                    { "fab5e2cc-78d5-4abd-8ed9-76f4c4398fd1", null, "Client", "CLIENT" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "CompanyName", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "GSTNumber", "IsActivated", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserPassword" },
                values: new object[] { "189d1231-9f34-4b1f-bd58-2175842c4274", 0, "Black Knight Enterprise", "f86d675f-5cef-4955-af8d-d2b2749a2481", new DateTime(2024, 7, 25, 17, 56, 14, 98, DateTimeKind.Local).AddTicks(6650), null, false, null, true, false, null, null, "ADMIN", "AQAAAAIAAYagAAAAEBhi0HwWTkVcqtH35Zd+HB1hXkPzlRGBjAk9NeTkpkquvVlBvJ2e/9ziprEtvktJNA==", null, false, "0dfb021b-ec01-4ab6-9fb3-595974f0a97e", false, "admin", "Admin@123" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "3064abfd-e740-4218-9fd6-05c79f9ded85", "189d1231-9f34-4b1f-bd58-2175842c4274" });
        }
    }
}
