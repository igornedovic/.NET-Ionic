using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data.Interfaces
{
    public interface ITransactionService
    {
        public List<Transaction> GetAllTransactionByUser();
        public TransactionReadDto AddTransaction(TransactionCreateDto transactionCreateDto);
    }
}