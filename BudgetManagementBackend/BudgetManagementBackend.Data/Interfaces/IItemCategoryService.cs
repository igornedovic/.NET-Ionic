using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.DTOs;

namespace BudgetManagementBackend.Data.Interfaces
{
    public interface IItemCategoryService
    {
        public List<ItemCategoryDto> GetAllItemCategories();
    }
}