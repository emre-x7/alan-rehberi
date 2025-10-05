using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerPathfinder.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtandTestResultsToCareerNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Careers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Careers",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Careers");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Careers");
        }
    }
}
