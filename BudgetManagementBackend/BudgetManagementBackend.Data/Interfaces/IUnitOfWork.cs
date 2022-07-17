using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.Interfaces
{
    public interface IUnitOfWork
    {
        public ITransactionRepository TransactionRepository { get; set; }
        public IUserRepository UserRepository { get; set; }
        public IItemCategoryRepository ItemCategoryRepository { get; set; }
        public IPurposeRepository PurposeRepository { get; set; }
        public void Commit();
    }
}