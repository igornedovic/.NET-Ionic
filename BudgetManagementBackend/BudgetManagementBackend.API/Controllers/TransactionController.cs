using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace BudgetManagementBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        // GET api/transaction
        [HttpGet]
        public List<Transaction> GetAllTransactionsByUser() {
            return transactionService.GetAllTransactionByUser();
        }
    }
}