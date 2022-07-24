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
                return _context.Transactions.Include(ti => ti.TransactionItems)
                                            .ThenInclude(p => p.Purpose)
                                            .ThenInclude(ic => ic.ItemCategory)
                                            .Where(t => t.UserId == userId).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public Transaction GetTransactionById(int userId, int id)
        {
            try
            {
                return _context.Transactions.Include(ti => ti.TransactionItems)
                                            .ThenInclude(p => p.Purpose)
                                            .ThenInclude(ic => ic.ItemCategory)
                                            .SingleOrDefault(t => t.UserId == userId
                                                                  && t.TransactionId == id);
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
                return _context.Transactions.AsNoTracking()
                                            .Include(ti => ti.TransactionItems)
                                            .ThenInclude(p => p.Purpose)
                                            .ThenInclude(ic => ic.ItemCategory)
                                            .Where(t => t.UserId == userId)
                                            .Select(tf => new Transaction
                                            {
                                                TransactionId = tf.TransactionId,
                                                Type = tf.Type,
                                                MonthYear = tf.MonthYear,
                                                TotalAmount = tf.TotalAmount,
                                                UserId = tf.UserId,
                                                TransactionItems = tf.TransactionItems.Where(ti => ti.Date >= fromDate && ti.Date <= toDate && ti.Amount >= minAmount && ti.Amount <= maxAmount).ToList()
                                            })
                                            .Where(tf => tf.TransactionItems.Count > 0)
                                            .ToList();
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

        public Transaction GetTransactionItemsToBeUpdated(Transaction transaction, Transaction transactionToUpdate)
        {
            foreach (TransactionItem ti in transaction.TransactionItems)
            {
                if (!transactionToUpdate.TransactionItems.Contains(ti))
                {
                    _context.Entry(ti).State = EntityState.Deleted;
                }
            }

            _context.SaveChanges();

            return transactionToUpdate;
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

        public List<Transaction> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}