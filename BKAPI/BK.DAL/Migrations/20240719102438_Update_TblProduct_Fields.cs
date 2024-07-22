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

            migrationBuilder.AddColumn<int>(
                name: "LinerJobWorkerId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SerialNumber",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "87121df0-ba26-49d4-86b7-d09597694a45", null, "JobWorker", "JOBWORKER" },
                    { "a14fd53e-7c3b-4315-96cc-e7b17131b43c", null, "Client", "CLIENT" },
                    { "e7aa90e3-5091-4523-a4a9-d0526d10287b", null, "Admin", "ADMIN" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "CompanyName", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "GSTNumber", "IsActivated", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserPassword" },
                values: new object[] { "924dc329-febc-41eb-b0ef-c47d46a5deea", 0, "Black Knight Enterprise", "eadc98c4-52ea-4738-a243-a73764bf43f7", new DateTime(2024, 7, 19, 15, 54, 38, 86, DateTimeKind.Local).AddTicks(3070), null, false, null, true, false, null, null, "ADMIN", "AQAAAAIAAYagAAAAEMS1dZLsfdW9nK9u8hnp52sw/5sgiWvXtm7AKtuRzCu6Af/pVLmuQ1iPK8/Ut0dkGQ==", null, false, "d1dbd71a-936e-47ec-a425-dd056d549298", false, "admin", "Admin@123" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "e7aa90e3-5091-4523-a4a9-d0526d10287b", "924dc329-febc-41eb-b0ef-c47d46a5deea" });

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
                keyValue: "87121df0-ba26-49d4-86b7-d09597694a45");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a14fd53e-7c3b-4315-96cc-e7b17131b43c");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "e7aa90e3-5091-4523-a4a9-d0526d10287b", "924dc329-febc-41eb-b0ef-c47d46a5deea" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e7aa90e3-5091-4523-a4a9-d0526d10287b");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "924dc329-febc-41eb-b0ef-c47d46a5deea");

            migrationBuilder.DropColumn(
                name: "LinerJobWorkerId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SerialNumber",
                table: "Products");

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
