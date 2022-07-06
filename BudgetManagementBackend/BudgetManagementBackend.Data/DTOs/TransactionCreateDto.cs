using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data.DTOs
{
    public class TransactionCreateDto
    {
        public string Purpose { get; set; }
        public string Type { get; set; }
        public string Date { get; set; }
        public double Amount { get; set; }
        public string ImageUrl { get; set; }
        public int UserId { get; set; }
    }
}