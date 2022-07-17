using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public TransactionType Type { get; set; }
        public string MonthYear { get; set; }
        public double TotalAmount { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<TransactionItem> TransactionItems { get; set; }
    }
}