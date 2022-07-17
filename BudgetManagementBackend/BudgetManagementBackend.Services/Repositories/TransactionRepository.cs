using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetManagementBackend.Services.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly BudgetDbContext _context;

        public TransactionRepository(BudgetDbContext context)
        {
            _context = context;
        }

        public List<Transaction> GetTransactionsByUser(int userId)
        {
            try
            {
                return _context.Transactions.Where(t => t.UserId == userId).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public List<Transaction> GetFilteredTransactionsByUser(int userId, DateTime fromDate, DateTime toDate, double minAmount, double maxAmount)
        {
            try
            {
                return null;
                // return _context.Transactions.Where(t => t.UserId == userId && t.Date >= fromDate && 
                //     t.Date <= toDate && t.Amount >= minAmount && t.Amount <= maxAmount)
                //         .OrderByDescending(t => t.Amount).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public Transaction Create(Transaction transaction)
        {
            try
            {
                _context.Add(transaction);
                _context.SaveChanges();
                return transaction;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public Transaction GetById(int id)
        {
            try
            {
                var transactionToUpdate = _context.Transactions.SingleOrDefault(t => t.TransactionId == id);
                _context.Entry(transactionToUpdate).State = EntityState.Detached;
                return transactionToUpdate;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public bool Update(Transaction t)
        {
            try
            {
                _context.Update(t);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool Delete(Transaction t)
        {
            try
            {
                _context.Transactions.Remove(t);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}