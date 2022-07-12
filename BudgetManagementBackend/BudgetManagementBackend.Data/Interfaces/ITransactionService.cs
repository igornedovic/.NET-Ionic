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
        public List<TransactionReadDto> GetAllTransactionByUser(int userId);
        public List<TransactionReadDto> GetFilteredTransactionsByUser(int userId, FilterParams filterParams);
        public TransactionReadDto AddTransaction(TransactionCreateDto transactionCreateDto);
        public bool UpdateTransaction(int id, TransactionCreateDto transactionCreateDto);
        public bool DeleteTransaction(int id);
    }
}