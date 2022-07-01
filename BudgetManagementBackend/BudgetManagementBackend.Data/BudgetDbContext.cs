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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine);
            optionsBuilder.EnableSensitiveDataLogging(true);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(u => u.Username).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.PasswordHash).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.PasswordSalt).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.FirstName).IsRequired();
            modelBuilder.Entity<User>().Property(u => u.LastName).IsRequired();

            modelBuilder.Entity<Transaction>().Property(t => t.Purpose).IsRequired();
            modelBuilder.Entity<Transaction>().Property(t => t.Type).IsRequired();
            modelBuilder.Entity<Transaction>().Property(t => t.Date).IsRequired();
            modelBuilder.Entity<Transaction>().Property(t => t.Amount).IsRequired();
            modelBuilder.Entity<Transaction>().Property(t => t.Type)
                .HasConversion(t => t.ToString(), t => (TransactionType)Enum.Parse(typeof(TransactionType), t));
            modelBuilder.Entity<Transaction>().HasOne(u => u.User).WithMany().HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
