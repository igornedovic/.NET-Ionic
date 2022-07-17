using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Services.Repositories
{
    public class ItemCategoryRepository : IItemCategoryRepository
    {
        private readonly BudgetDbContext _context;

        public ItemCategoryRepository(BudgetDbContext context)
        {
            _context = context;
        }
        public List<ItemCategory> GetAll()
        {
            try
            {
                return _context.ItemCategories.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public ItemCategory GetById(int id)
        {
            throw new NotImplementedException();
        }

        public ItemCategory Create(ItemCategory t)
        {
            throw new NotImplementedException();
        }

        public bool Update(ItemCategory t)
        {
            throw new NotImplementedException();
        }

        public bool Delete(ItemCategory t)
        {
            throw new NotImplementedException();
        }

    }
}