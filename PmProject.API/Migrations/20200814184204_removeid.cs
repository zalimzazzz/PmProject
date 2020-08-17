using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PmProject.API.Migrations
{
    public partial class removeid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TemplateServiceOrderQuestion_TemplateServiceOrder_TemplateServiceOrderId",
                table: "TemplateServiceOrderQuestion");

            migrationBuilder.DropColumn(
                name: "TemplateServiceOrderAnswerId",
                table: "TemplateServiceOrderQuestion");

            migrationBuilder.AlterColumn<Guid>(
                name: "TemplateServiceOrderId",
                table: "TemplateServiceOrderQuestion",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateServiceOrderQuestion_TemplateServiceOrder_TemplateServiceOrderId",
                table: "TemplateServiceOrderQuestion",
                column: "TemplateServiceOrderId",
                principalTable: "TemplateServiceOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TemplateServiceOrderQuestion_TemplateServiceOrder_TemplateServiceOrderId",
                table: "TemplateServiceOrderQuestion");

            migrationBuilder.AlterColumn<Guid>(
                name: "TemplateServiceOrderId",
                table: "TemplateServiceOrderQuestion",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "TemplateServiceOrderAnswerId",
                table: "TemplateServiceOrderQuestion",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateServiceOrderQuestion_TemplateServiceOrder_TemplateServiceOrderId",
                table: "TemplateServiceOrderQuestion",
                column: "TemplateServiceOrderId",
                principalTable: "TemplateServiceOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
