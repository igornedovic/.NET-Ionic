using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.DTOs
{
    public class FilterParams
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public double MinAmount { get; set; }
        public double MaxAmount { get; set; }
    }
}