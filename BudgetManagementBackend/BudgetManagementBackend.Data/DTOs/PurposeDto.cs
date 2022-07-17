using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.DTOs
{
    public class PurposeDto
    {
        public int PurposeId { get; set; }
        public string Name { get; set; }
        public int ItemCategoryId { get; set; }

    }
}