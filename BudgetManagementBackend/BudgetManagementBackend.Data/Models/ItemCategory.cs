using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.Models
{
    public enum CategoryName
    {
        PersonalIncome,
        BusinessIncome,
        PersonalExpense,
        BusinessExpense
    }
    public class ItemCategory
    {
        public int ItemCategoryId { get; set; }
        public CategoryName Name { get; set; }
        public List<Purpose> Purposes { get; set; }
    }
}