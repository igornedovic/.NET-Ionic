﻿// <auto-generated />
using System;
using BudgetManagementBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BudgetManagementBackend.Data.Migrations
{
    [DbContext(typeof(BudgetDbContext))]
    [Migration("20220717191328_Test")]
    partial class Test
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BudgetManagementBackend.Data.Models.ItemCategory", b =>
                {
                    b.Property<int>("ItemCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ItemCategoryId");

                    b.ToTable("ItemCategories");
                });

            modelBuilder.Entity("BudgetManagementBackend.Data.Models.Purpose", b =>
                {
                    b.Property<int>("PurposeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ItemCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PurposeId");

                    b.HasIndex("ItemCategoryId");

                    b.ToTable("Purposes");
                });

            modelBuilder.Entity("BudgetManagementBackend.Data.Models.Transaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("MonthYear")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("TotalAmount")
                        .HasColumnType("float");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("TransactionId");

                    b.HasIndex("UserId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("BudgetManagementBackend.Data.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BudgetManagementBackend.Data.Models.Purpose", b =>
                {
                    b.HasOne("BudgetManagementBackend.Data.Models.ItemCategory", "ItemCategory")
                        .WithMany("Purposes")
                        .HasForeignKey("ItemCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ItemCategory");
                });

            modelBuilder.Entity("BudgetManagementBackend.Data.Models.Transaction", b =>
                {
                    b.HasOne("BudgetManagementBackend.Data.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.OwnsMany("BudgetManagementBackend.Data.Models.TransactionItem", "TransactionItems", b1 =>
                        {
                            b1.Property<int>("TransactionId")
                                .HasColumnType("int");

                            b1.Property<int>("TransactionItemId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<double>("Amount")
                                .HasColumnType("float");

                            b1.Property<DateTime>("Date")
                                .HasColumnType("datetime2");

                            b1.Property<string>("ImageUrl")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<int>("PurposeId")
                                .HasColumnType("int");

                            b1.HasKey("TransactionId", "TransactionItemId");

                            b1.HasIndex("PurposeId");

                            b1.ToTable("TransactionItems");

                            b1.HasOne("BudgetManagementBackend.Data.Models.Purpose", "Purpose")
                                .WithMany()
                                .HasForeignKey("PurposeId")
                                .OnDelete(DeleteBehavior.Restrict)
                                .IsRequired();

                            b1.WithOwner("Transaction")
                                .HasForeignKey("TransactionId");

                            b1.Navigation("Purpose");

                            b1.Navigation("Transaction");
                        });

                    b.Navigation("TransactionItems");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BudgetManagementBackend.Data.Models.ItemCategory", b =>
                {
                    b.Navigation("Purposes");
                });
#pragma warning restore 612, 618
        }
    }
}
