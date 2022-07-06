using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetManagementBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        // GET api/transaction
        [HttpGet]
        [Authorize(Roles = "User")]
        public ActionResult<List<Transaction>> GetAllTransactionsByUser()
        {
            return _transactionService.GetAllTransactionByUser();
        }

        // POST api/transaction
        [HttpPost]
        public ActionResult<TransactionReadDto> AddTransaction(TransactionCreateDto transactionCreateDto)
        {
            var transaction = _transactionService.AddTransaction(transactionCreateDto);

            if (transaction == null) return BadRequest("Could not add transaction!");

            return Ok(transaction);
        }
    }
}