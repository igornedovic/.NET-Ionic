using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementBackend.Data.Models
{
    public class TransactionItem
    {
        public int TransactionItemId { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public string ImageUrl { get; set; }
        public int TransactionId { get; set; }
        public Transaction Transaction { get; set; }
        public int PurposeId { get; set; }
        public Purpose Purpose { get; set; }
    }
}