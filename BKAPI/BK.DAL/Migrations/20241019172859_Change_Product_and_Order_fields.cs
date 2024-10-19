using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BK.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Change_Product_and_Order_fields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_PrintTypes_PrintTypeId",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "82f5b5a3-b14f-46a8-9ccb-dc09f365891b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "be40b1ed-f30a-4fdd-ac15-191c091d795a");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "05be2af9-4c2b-4938-a67f-e050882f355b", "7ee3c0fd-f9aa-4586-b60b-3378f59a8a5a" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05be2af9-4c2b-4938-a67f-e050882f355b");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7ee3c0fd-f9aa-4586-b60b-3378f59a8a5a");

            migrationBuilder.AlterColumn<int>(
                name: "PrintTypeId",
                table: "Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "DieCode",
                table: "Products",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PrintingPlate",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext");

            migrationBuilder.AlterColumn<string>(
                name: "PrintTypeName",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext");

            migrationBuilder.AlterColumn<string>(
                name: "DieCode",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5fbfd1ce-0011-405d-88a6-c4126a28d81c", null, "JobWorker", "JOBWORKER" },
                    { "63bd0dfd-4711-4285-a882-966d8f08fe24", null, "Client", "CLIENT" },
                    { "ff74a379-3673-4b5b-a8a0-3086801d3b6d", null, "Admin", "ADMIN" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "CompanyName", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "GSTNumber", "IsActivated", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserPassword" },
                values: new object[] { "41643431-f21d-4467-a659-3a75498a119c", 0, "Black Knight Enterprise", "4a441d46-07d8-49bd-b780-f5b1359bf50f", new DateTime(2024, 10, 19, 22, 58, 58, 742, DateTimeKind.Local).AddTicks(3960), null, false, null, true, false, null, null, "ADMIN", "AQAAAAIAAYagAAAAEF9U1eGTYq0oAny+OLFDQ+mJZH7H1CyiK+7l4wT4UfaLnbC/Aux9ufKf/Axpd112Xw==", null, false, "e02b5195-5378-4e2d-9b4f-dfd743bf6e45", false, "admin", "Admin@123" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "ff74a379-3673-4b5b-a8a0-3086801d3b6d", "41643431-f21d-4467-a659-3a75498a119c" });

            migrationBuilder.AddForeignKey(
                name: "FK_Products_PrintTypes_PrintTypeId",
                table: "Products",
                column: "PrintTypeId",
                principalTable: "PrintTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_PrintTypes_PrintTypeId",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5fbfd1ce-0011-405d-88a6-c4126a28d81c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "63bd0dfd-4711-4285-a882-966d8f08fe24");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "ff74a379-3673-4b5b-a8a0-3086801d3b6d", "41643431-f21d-4467-a659-3a75498a119c" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ff74a379-3673-4b5b-a8a0-3086801d3b6d");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "41643431-f21d-4467-a659-3a75498a119c");

            migrationBuilder.AlterColumn<int>(
                name: "PrintTypeId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DieCode",
                table: "Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PrintingPlate",
                table: "Orders",
                type: "longtext",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PrintTypeName",
                table: "Orders",
                type: "longtext",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DieCode",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05be2af9-4c2b-4938-a67f-e050882f355b", null, "Admin", "ADMIN" },
                    { "82f5b5a3-b14f-46a8-9ccb-dc09f365891b", null, "Client", "CLIENT" },
                    { "be40b1ed-f30a-4fdd-ac15-191c091d795a", null, "JobWorker", "JOBWORKER" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "CompanyName", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "GSTNumber", "IsActivated", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserPassword" },
                values: new object[] { "7ee3c0fd-f9aa-4586-b60b-3378f59a8a5a", 0, "Black Knight Enterprise", "04bf1dbe-c5e9-401c-bdc2-2431009fb786", new DateTime(2024, 10, 17, 0, 31, 34, 327, DateTimeKind.Local).AddTicks(7350), null, false, null, true, false, null, null, "ADMIN", "AQAAAAIAAYagAAAAEO0ifxa7qSwqxH6s3MYZgMdtF0tZN7I/f082wdyiCGiL0oSjJL6WVWh2en4xogIJCw==", null, false, "e2178472-78e0-4676-a271-5e2162e81e4c", false, "admin", "Admin@123" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "05be2af9-4c2b-4938-a67f-e050882f355b", "7ee3c0fd-f9aa-4586-b60b-3378f59a8a5a" });

            migrationBuilder.AddForeignKey(
                name: "FK_Products_PrintTypes_PrintTypeId",
                table: "Products",
                column: "PrintTypeId",
                principalTable: "PrintTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
