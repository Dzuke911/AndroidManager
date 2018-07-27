using Microsoft.EntityFrameworkCore.Migrations;

namespace AndroidManager.Data.Migrations
{
    public partial class AddDefaultJob : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [dbo].[Jobs] ( [Name], [Description], [Complexity]) VALUES ( N'Simple job', N'this job is easy to learn', 1)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [dbo].[Jobs] WHERE [Name] = N'Simple job'");
        }
    }
}
