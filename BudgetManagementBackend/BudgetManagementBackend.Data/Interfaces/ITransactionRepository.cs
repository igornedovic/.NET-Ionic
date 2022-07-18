using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data.Interfaces
{
    public interface ITransactionRepository : IRepository<Transaction>
    {
        public List<Transaction> GetTransactionsByUser(int userId);
        public List<Transaction> GetFilteredTransactionsByUser(int userId, DateTime fromDate, 
            DateTime toDate, double minAmount, double maxAmount);
        public Transaction GetTransactionItemsToBeUpdated(Transaction transaction, Transaction transactionToUpdate);
    }
}