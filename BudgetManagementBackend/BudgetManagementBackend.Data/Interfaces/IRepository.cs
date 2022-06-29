using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.Interfaces
{
    public interface IRepository<T> where T : class
    {
        public List<T> GetAllByUser();
    }
}