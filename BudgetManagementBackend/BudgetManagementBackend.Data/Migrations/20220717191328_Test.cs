using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetManagementBackend.Data.Migrations
{
    public partial class Test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purposes_ItemCategories_ItemCategoryId1",
                table: "Purposes");

            migrationBuilder.DropIndex(
                name: "IX_Purposes_ItemCategoryId1",
                table: "Purposes");

            migrationBuilder.DropColumn(
                name: "ItemCategoryId1",
                table: "Purposes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ItemCategoryId1",
                table: "Purposes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Purposes_ItemCategoryId1",
                table: "Purposes",
                column: "ItemCategoryId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Purposes_ItemCategories_ItemCategoryId1",
                table: "Purposes",
                column: "ItemCategoryId1",
                principalTable: "ItemCategories",
                principalColumn: "ItemCategoryId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
