using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetManagementBackend.Services.Repositories
{
    public class PurposeRepository : IPurposeRepository
    {
        private readonly BudgetDbContext _context;

        public PurposeRepository(BudgetDbContext context)
        {
            _context = context;
        }
        public List<Purpose> GetAll()
        {
            try
            {
                return _context.Purposes.Include(ic => ic.ItemCategory)
                                        .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public Purpose GetById(int id)
        {
            throw new NotImplementedException();
        }
        public Purpose Create(Purpose t)
        {
            throw new NotImplementedException();
        }

        public bool Update(Purpose t)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Purpose t)
        {
            throw new NotImplementedException();
        }

    }
}