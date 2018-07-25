using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AndroidManager.Data.Migrations
{
    public partial class AddAvatar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Androids");

            migrationBuilder.AddColumn<byte[]>(
                name: "Avatar",
                table: "Androids",
                nullable: true);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Androids");

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "Androids",
                nullable: true);
        }
    }
}
