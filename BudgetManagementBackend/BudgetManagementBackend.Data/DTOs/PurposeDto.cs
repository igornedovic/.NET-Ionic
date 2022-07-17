using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data.DTOs
{
    public class PurposeDto
    {
        public int PurposeId { get; set; }
        public string Name { get; set; }
        public ItemCategoryDto ItemCategory { get; set; }
    }
}