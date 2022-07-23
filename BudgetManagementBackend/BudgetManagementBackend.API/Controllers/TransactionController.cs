using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetManagementBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "User")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        // GET api/user/{userId}/transactions
        [Route("~/api/user/{userId}/transactions")]
        [HttpGet]
        public ActionResult<List<TransactionReadDto>> GetAllTransactionsByUser(int userId)
        {
            var transactions = _transactionService.GetAllTransactionByUser(userId);

            if (transactions == null || transactions.Count == 0) return NotFound("No transactions found!");

            return Ok(transactions);
        }

        // GET api/user/{userId}/transactions/{id}
        [Route("~/api/user/{userId}/transactions/{id}")]
        [HttpGet]
        public ActionResult<TransactionReadDto> GetTransactionById(int userId, int id)
        {
            var transaction = _transactionService.GetTransactionById(userId, id);

            if (transaction == null) return NotFound("Could not find transaction with given id!");

            return Ok(transaction);
        }

        // GET api/user/{userId}/transactionItemsToFilter
        [Route("~/api/user/{userId}/transactionItemsToFilter")]
        [HttpGet]
        public ActionResult<List<TransactionReadDto>> GetFilteredTransactionItemsByUser(int userId,
            [FromQuery] FilterParams filterParams)
        {
            var filteredTransactions = _transactionService.GetFilteredTransactionsByUser(userId,
                filterParams);

            if (filteredTransactions == null || filteredTransactions.Count == 0)
                return NotFound("Could not find transactions based on a given criteria.");

            return Ok(filteredTransactions);
        }

        // POST api/transaction
        [HttpPost]
        public ActionResult<TransactionReadDto> AddTransaction(TransactionCreateDto transactionCreateDto)
        {
            var transaction = _transactionService.AddTransaction(transactionCreateDto);

            if (transaction == null) return BadRequest("Unable to add transaction!");

            return Ok(transaction);
        }

        // PUT api/transaction/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateTransaction(int id, TransactionCreateDto transactionCreateDto)
        {
            if (_transactionService.UpdateTransaction(id, transactionCreateDto))
                return Ok("Successfully updated!");

            return BadRequest("Unable to update transaction!");
        }

        // DELETE api/transaction/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteTransaction(int id)
        {
            if (_transactionService.DeleteTransaction(id))
                return Ok("Successfully deleted!");

            return BadRequest("Unable to delete transaction!");
        }
    }
}