using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Services.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly BudgetDbContext context;

        public TransactionRepository(BudgetDbContext context)
        {
            this.context = context;
        }

        public Transaction Create(Transaction transaction)
        {
            throw new NotImplementedException();
        }

        public List<Transaction> GetAllByUser()
        {
            return new List<Transaction>()
            {
                new Transaction()
                {
                    Purpose = "Salary",
                    Type = TransactionType.Deposit,
                    Date = DateTime.Now,
                    Amount = 50000,
                    UserId = 1
                },
                new Transaction()
                {
                    Purpose = "Bills",
                    Type = TransactionType.Withdrawal,
                    Date = DateTime.Now,
                    Amount = 17000,
                    UserId = 2
                }
            };
        }
    }
}