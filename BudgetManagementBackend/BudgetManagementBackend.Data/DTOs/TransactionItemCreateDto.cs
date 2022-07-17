using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.DTOs
{
    public class TransactionItemCreateDto
    {
        public string Date { get; set; }
        public double Amount { get; set; }
        public string ImageUrl { get; set; }
        public int PurposeId { get; set; }
    }
}