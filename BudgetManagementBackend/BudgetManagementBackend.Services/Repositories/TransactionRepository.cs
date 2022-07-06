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
        private readonly BudgetDbContext _context;

        public TransactionRepository(BudgetDbContext context)
        {
            _context = context;
        }

        public Transaction Create(Transaction transaction)
        {
            try
            {
                _context.Add(transaction);
                _context.SaveChanges();
                return transaction;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

    }
}