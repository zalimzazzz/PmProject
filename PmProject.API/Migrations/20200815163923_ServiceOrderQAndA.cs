using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PmProject.API.Migrations
{
    public partial class ServiceOrderQAndA : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceOrderQAndA",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreateBy = table.Column<Guid>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<Guid>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    ServiceOrderId = table.Column<Guid>(nullable: false),
                    AnswerId = table.Column<Guid>(nullable: false),
                    TemplateServiceOrderQuestionId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceOrderQAndA", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceOrderQAndA_ServiceOrder_ServiceOrderId",
                        column: x => x.ServiceOrderId,
                        principalTable: "ServiceOrder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceOrderQAndA_ServiceOrderId",
                table: "ServiceOrderQAndA",
                column: "ServiceOrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceOrderQAndA");
        }
    }
}
