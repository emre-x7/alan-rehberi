using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CareerPathfinder.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCareerDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CareerDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CareerId = table.Column<int>(type: "integer", nullable: false),
                    Summary = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    WorkAreas = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    AverageSalary = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    BeginnerResources = table.Column<string>(type: "jsonb", nullable: false),
                    IntermediateResources = table.Column<string>(type: "jsonb", nullable: false),
                    AdvancedResources = table.Column<string>(type: "jsonb", nullable: false),
                    ProjectIdeas = table.Column<string>(type: "jsonb", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CareerDetails_Careers_CareerId",
                        column: x => x.CareerId,
                        principalTable: "Careers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CareerDetails_CareerId",
                table: "CareerDetails",
                column: "CareerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CareerDetails_IsActive",
                table: "CareerDetails",
                column: "IsActive");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CareerDetails");
        }
    }
}
