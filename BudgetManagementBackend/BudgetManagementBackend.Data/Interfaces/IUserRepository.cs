using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        public bool CheckUsername(string username);
    }
}