using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data.DTOs
{
    public class TransactionReadDto
    {
        public int TransactionId { get; set; }
        public string Purpose { get; set; }
        public TransactionType Type { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public string ImageUrl { get; set; }
        public int UserId { get; set; }
    }
}