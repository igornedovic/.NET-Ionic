using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Services.Repositories;

namespace BudgetManagementBackend.Services.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BudgetDbContext context;

        public UnitOfWork(BudgetDbContext context)
        {
            this.context = context;
            TransactionRepository = new TransactionRepository(context);
            UserRepository = new UserRepository(context);
            ItemCategoryRepository = new ItemCategoryRepository(context);
            PurposeRepository = new PurposeRepository(context);
        }
        public ITransactionRepository TransactionRepository { get; set; }
        public IUserRepository UserRepository { get; set; }
        public IItemCategoryRepository ItemCategoryRepository { get; set; }
        public IPurposeRepository PurposeRepository { get; set; }

        public void Commit()
        {
            context.SaveChanges();
        }
    }
}