using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetManagementBackend.Data.Migrations
{
    public partial class ImageUrlPropertyToTransactionModelAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Transactions");
        }
    }
}
