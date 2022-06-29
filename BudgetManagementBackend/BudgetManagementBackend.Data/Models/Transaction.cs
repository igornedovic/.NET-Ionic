using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public string Purpose { get; set; }
        public TransactionType Type { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}