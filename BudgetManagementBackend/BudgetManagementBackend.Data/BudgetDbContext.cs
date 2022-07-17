using System;
using Microsoft.EntityFrameworkCore;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data
{
    public class BudgetDbContext : DbContext
    {

        public BudgetDbContext(DbContextOptions<BudgetDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionItem> TransactionItems { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<Purpose> Purposes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.LogTo(Console.WriteLine);
            // optionsBuilder.EnableSensitiveDataLogging(true);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(u => u.Username).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.PasswordHash).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.PasswordSalt).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.FirstName).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.LastName).IsRequired();

            modelBuilder.Entity<Transaction>().Property(t => t.Type).IsRequired();
            modelBuilder.Entity<Transaction>().Property(t => t.MonthYear).IsRequired();
            modelBuilder.Entity<Transaction>().Property(t => t.TotalAmount).IsRequired();
            modelBuilder.Entity<Transaction>().Property(t => t.Type)
                .HasConversion(t => t.ToString(), t => (TransactionType)Enum.Parse(typeof(TransactionType), t));
            modelBuilder.Entity<Transaction>().HasOne(u => u.User).WithMany().HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Transaction>().OwnsMany(t => t.TransactionItems, ti =>
            {
                ti.WithOwner(ti => ti.Transaction);
                ti.HasOne(ti => ti.Purpose).WithMany().HasForeignKey(ti => ti.PurposeId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Purpose>().Property(p => p.Name).IsRequired();
            modelBuilder.Entity<Purpose>().HasOne(ic => ic.ItemCategory).WithMany().HasForeignKey(ic => ic.ItemCategoryId);

            modelBuilder.Entity<ItemCategory>().Property(ic => ic.Name).IsRequired();
            modelBuilder.Entity<ItemCategory>().Property(ic => ic.Name)
                .HasConversion(ic => ic.ToString(), ic => (CategoryName)Enum.Parse(typeof(CategoryName), ic));
        }
    }
}
