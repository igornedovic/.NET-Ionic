using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data.DTOs
{
    public class TransactionCreateDto
    {
        public string Type { get; set; }
        public string MonthYear { get; set; }
        public double TotalAmount { get; set; }
        public int UserId { get; set; }
        public List<TransactionItemCreateDto> TransactionItems { get; set; }
    }
}