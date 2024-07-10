using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BK.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Update_TblUser_Schema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "WhatsappNumber",
                table: "AspNetUsers",
                newName: "GSTNumber");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "GSTNumber",
                table: "AspNetUsers",
                newName: "WhatsappNumber");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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
        }
    }
}
