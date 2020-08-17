using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PmProject.API.Migrations
{
    public partial class TemplateServiceOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TemplateServiceOrder",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreateBy = table.Column<Guid>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<Guid>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    CompanyId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TemplateServiceOrder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TemplateServiceOrder_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TemplateServiceOrderQuestion",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreateBy = table.Column<Guid>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<Guid>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    AnswerTypeId = table.Column<int>(nullable: false),
                    TemplateServiceOrderId = table.Column<Guid>(nullable: true),
                    TemplateServiceOrderAnswerId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TemplateServiceOrderQuestion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TemplateServiceOrderQuestion_TemplateServiceOrder_TemplateServiceOrderId",
                        column: x => x.TemplateServiceOrderId,
                        principalTable: "TemplateServiceOrder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TemplateServiceOrderAnswer",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreateBy = table.Column<Guid>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<Guid>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    Answer = table.Column<string>(nullable: false),
                    TemplateServiceOrderQuestionId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TemplateServiceOrderAnswer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TemplateServiceOrderAnswer_TemplateServiceOrderQuestion_TemplateServiceOrderQuestionId",
                        column: x => x.TemplateServiceOrderQuestionId,
                        principalTable: "TemplateServiceOrderQuestion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TemplateServiceOrder_CompanyId",
                table: "TemplateServiceOrder",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_TemplateServiceOrderAnswer_TemplateServiceOrderQuestionId",
                table: "TemplateServiceOrderAnswer",
                column: "TemplateServiceOrderQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_TemplateServiceOrderQuestion_TemplateServiceOrderId",
                table: "TemplateServiceOrderQuestion",
                column: "TemplateServiceOrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TemplateServiceOrderAnswer");

            migrationBuilder.DropTable(
                name: "TemplateServiceOrderQuestion");

            migrationBuilder.DropTable(
                name: "TemplateServiceOrder");
        }
    }
}
