using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PmProject.API.Migrations
{
    public partial class ServiceOrderQAndA1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnswerId",
                table: "ServiceOrderQAndA");

            migrationBuilder.DropColumn(
                name: "TemplateServiceOrderQuestionId",
                table: "ServiceOrderQAndA");

            migrationBuilder.AddColumn<string>(
                name: "Answer",
                table: "ServiceOrderQAndA",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "AnswerTypeId",
                table: "ServiceOrderQAndA",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "QuestionId",
                table: "ServiceOrderQAndA",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answer",
                table: "ServiceOrderQAndA");

            migrationBuilder.DropColumn(
                name: "AnswerTypeId",
                table: "ServiceOrderQAndA");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "ServiceOrderQAndA");

            migrationBuilder.AddColumn<Guid>(
                name: "AnswerId",
                table: "ServiceOrderQAndA",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TemplateServiceOrderQuestionId",
                table: "ServiceOrderQAndA",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
