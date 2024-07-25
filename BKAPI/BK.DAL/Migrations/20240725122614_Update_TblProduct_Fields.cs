using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BK.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Update_TblProduct_Fields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7632cd99-1844-4f1e-8f3d-6c84f4a5ccf5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f411f012-f3eb-4f19-ade4-7e352c48552d");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "af1dfb08-053e-46ea-a752-0b150d432c52", "473a1ad9-2484-41ff-834c-9f7f5d5115cd" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af1dfb08-053e-46ea-a752-0b150d432c52");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "473a1ad9-2484-41ff-834c-9f7f5d5115cd");

            migrationBuilder.RenameColumn(
                name: "NoOfSheerPerBox",
                table: "Products",
                newName: "SerialNumber");

            migrationBuilder.AlterColumn<int>(
                name: "DieCode",
                table: "Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "LinerJobWorkerId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NoOfSheetPerBox",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.CreateIndex(
                name: "IX_Products_LinerJobWorkerId",
                table: "Products",
                column: "LinerJobWorkerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_JobWorkers_LinerJobWorkerId",
                table: "Products",
                column: "LinerJobWorkerId",
                principalTable: "JobWorkers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_JobWorkers_LinerJobWorkerId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_LinerJobWorkerId",
                table: "Products");

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

            migrationBuilder.DropColumn(
                name: "LinerJobWorkerId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "NoOfSheetPerBox",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "SerialNumber",
                table: "Products",
                newName: "NoOfSheerPerBox");

            migrationBuilder.AlterColumn<int>(
                name: "DieCode",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7632cd99-1844-4f1e-8f3d-6c84f4a5ccf5", null, "Client", "CLIENT" },
                    { "af1dfb08-053e-46ea-a752-0b150d432c52", null, "Admin", "ADMIN" },
                    { "f411f012-f3eb-4f19-ade4-7e352c48552d", null, "JobWorker", "JOBWORKER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "CompanyName", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "GSTNumber", "IsActivated", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserPassword" },
                values: new object[] { "473a1ad9-2484-41ff-834c-9f7f5d5115cd", 0, "Black Knight Enterprise", "69431f12-a887-48a6-85b0-0552e636d956", new DateTime(2024, 7, 3, 16, 8, 26, 719, DateTimeKind.Local).AddTicks(4840), null, false, null, true, false, null, null, "ADMIN", "AQAAAAIAAYagAAAAEISVfG39+P4zvAyBDYKfhTFddWoEmDOejmGRAU63pKXORrQ2CKemWwrxEBsc7fopAQ==", null, false, "100f99e2-f51f-4a81-94f7-accc3aa1bfce", false, "admin", "Admin@123" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "af1dfb08-053e-46ea-a752-0b150d432c52", "473a1ad9-2484-41ff-834c-9f7f5d5115cd" });
        }
    }
}
