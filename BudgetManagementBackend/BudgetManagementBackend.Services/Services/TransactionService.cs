using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Services.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IUnitOfWork uow;

        public TransactionService(IUnitOfWork uow)
        {
            this.uow = uow;
        }
        public List<Transaction> GetAllTransactionByUser()
        {
            return uow.TransactionRepository.GetAllByUser();
        }
    }
}