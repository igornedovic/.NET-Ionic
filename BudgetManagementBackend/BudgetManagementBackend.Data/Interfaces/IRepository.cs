using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.Interfaces
{
    public interface IRepository<T> where T : class
    {
        public List<T> GetAll();
        public T GetById(int id);
        public T Create(T t);
        public bool Update(T t);
        public bool Delete (T t);
    }
}