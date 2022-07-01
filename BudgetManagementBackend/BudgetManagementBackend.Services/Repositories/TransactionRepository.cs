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

    }
}