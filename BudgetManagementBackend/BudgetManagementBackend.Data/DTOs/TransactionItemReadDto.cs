using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace BudgetManagementBackend.Data.DTOs
{
    public class TransactionItemReadDto
    {
        public int TransactionItemId { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public string ImageUrl { get; set; }
        public int TransactionId { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public PurposeDto Purpose { get; set; }
    }
}