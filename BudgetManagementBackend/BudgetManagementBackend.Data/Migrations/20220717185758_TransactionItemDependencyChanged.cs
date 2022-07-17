using Microsoft.EntityFrameworkCore.Migrations;

namespace BudgetManagementBackend.Data.Migrations
{
    public partial class TransactionItemDependencyChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionItems_ItemCategories_ItemCategoryId",
                table: "TransactionItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Purposes",
                table: "Purposes");

            migrationBuilder.RenameColumn(
                name: "ItemCategoryId",
                table: "TransactionItems",
                newName: "PurposeId");

            migrationBuilder.RenameIndex(
                name: "IX_TransactionItems_ItemCategoryId",
                table: "TransactionItems",
                newName: "IX_TransactionItems_PurposeId");

            migrationBuilder.AddColumn<int>(
                name: "ItemCategoryId1",
                table: "Purposes",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Purposes",
                table: "Purposes",
                column: "PurposeId");

            migrationBuilder.CreateIndex(
                name: "IX_Purposes_ItemCategoryId",
                table: "Purposes",
                column: "ItemCategoryId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionItems_Purposes_PurposeId",
                table: "TransactionItems",
                column: "PurposeId",
                principalTable: "Purposes",
                principalColumn: "PurposeId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purposes_ItemCategories_ItemCategoryId1",
                table: "Purposes");

            migrationBuilder.DropForeignKey(
                name: "FK_TransactionItems_Purposes_PurposeId",
                table: "TransactionItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Purposes",
                table: "Purposes");

            migrationBuilder.DropIndex(
                name: "IX_Purposes_ItemCategoryId",
                table: "Purposes");

            migrationBuilder.DropIndex(
                name: "IX_Purposes_ItemCategoryId1",
                table: "Purposes");

            migrationBuilder.DropColumn(
                name: "ItemCategoryId1",
                table: "Purposes");

            migrationBuilder.RenameColumn(
                name: "PurposeId",
                table: "TransactionItems",
                newName: "ItemCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_TransactionItems_PurposeId",
                table: "TransactionItems",
                newName: "IX_TransactionItems_ItemCategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Purposes",
                table: "Purposes",
                columns: new[] { "ItemCategoryId", "PurposeId" });

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionItems_ItemCategories_ItemCategoryId",
                table: "TransactionItems",
                column: "ItemCategoryId",
                principalTable: "ItemCategories",
                principalColumn: "ItemCategoryId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
