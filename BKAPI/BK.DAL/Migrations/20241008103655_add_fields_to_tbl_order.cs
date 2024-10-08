using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BK.DAL.Migrations
{
    /// <inheritdoc />
    public partial class add_fields_to_tbl_order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Back",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BackPaperTypeName",
                table: "Orders",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<double>(
                name: "BackPrice",
                table: "Orders",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "BrandName",
                table: "Orders",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "ClientId",
                table: "Orders",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<int>(
                name: "DieCode",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flute",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FlutePaperTypeName",
                table: "Orders",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<double>(
                name: "FlutePrice",
                table: "Orders",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "JobWorkerId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "LaminationPrice",
                table: "Orders",
                type: "double",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LinerJobworkerId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "NoOfSheetPerBox",
                table: "Orders",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Ply",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "PrintRate",
                table: "Orders",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "PrintTypeName",
                table: "Orders",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "PrintingPlate",
                table: "Orders",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<double>(
                name: "ProfitPercent",
                table: "Orders",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Top",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TopPaperTypeName",
                table: "Orders",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<double>(
                name: "TopPrice",
                table: "Orders",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.DropColumn(
                name: "Back",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BackPaperTypeName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BackPrice",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BrandName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DieCode",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Flute",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "FlutePaperTypeName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "FlutePrice",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "JobWorkerId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "LaminationPrice",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "LinerJobworkerId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "NoOfSheetPerBox",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Ply",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PrintRate",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PrintTypeName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PrintingPlate",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ProfitPercent",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Top",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TopPaperTypeName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TopPrice",
                table: "Orders");
        }
    }
}
