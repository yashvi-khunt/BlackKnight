using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BK.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Add_IsCompleted_To_Order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Orders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1f1711f6-8dda-499e-932f-d339e8baeb6b", null, "Admin", "ADMIN" },
                    { "c3efd6bb-19c2-4251-9884-abb6c5f0deaf", null, "Client", "CLIENT" },
                    { "e803cb67-f763-473b-9309-d6c783031dac", null, "JobWorker", "JOBWORKER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "CompanyName", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "GSTNumber", "IsActivated", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserPassword" },
                values: new object[] { "e86b7ea3-63b7-4bc4-bcf7-fd1a30c15fb9", 0, "Black Knight Enterprise", "52d0d980-a9d3-4aa1-8bbc-83b2bfa73e67", new DateTime(2024, 8, 3, 22, 20, 20, 830, DateTimeKind.Local).AddTicks(5800), null, false, null, true, false, null, null, "ADMIN", "AQAAAAIAAYagAAAAENTTtiTrqdjGFH1rgFiXPveaZZ3TZPXBESoVBUZO9xs/gxMb7zTz4de1u6Utfe6mMw==", null, false, "94fe6abf-78c7-4cd3-a5b9-a8363b58a1ae", false, "admin", "Admin@123" });

            migrationBuilder.InsertData(
                table: "PrintTypes",
                columns: new[] { "Id", "IsOffset", "Name" },
                values: new object[,]
                {
                    { 1, false, "2 CLR" },
                    { 2, true, "2 CLR" },
                    { 3, false, "4 CLR" },
                    { 4, true, "4 CLR" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1f1711f6-8dda-499e-932f-d339e8baeb6b", "e86b7ea3-63b7-4bc4-bcf7-fd1a30c15fb9" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3efd6bb-19c2-4251-9884-abb6c5f0deaf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e803cb67-f763-473b-9309-d6c783031dac");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1f1711f6-8dda-499e-932f-d339e8baeb6b", "e86b7ea3-63b7-4bc4-bcf7-fd1a30c15fb9" });

            migrationBuilder.DeleteData(
                table: "PrintTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PrintTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "PrintTypes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "PrintTypes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1f1711f6-8dda-499e-932f-d339e8baeb6b");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e86b7ea3-63b7-4bc4-bcf7-fd1a30c15fb9");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Orders");

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
    }
}
