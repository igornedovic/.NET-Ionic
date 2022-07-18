using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Services.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public TransactionService(IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
        }

        public List<TransactionReadDto> GetAllTransactionByUser(int userId)
        {
            var transactions = _uow.TransactionRepository.GetTransactionsByUser(userId);

            if (transactions == null) return null;

            return _mapper.Map<List<TransactionReadDto>>(transactions);
        }

        public List<TransactionReadDto> GetFilteredTransactionsByUser(int userId, FilterParams filterParams)
        {
            DateTime fromDate = DateTime.ParseExact(filterParams.FromDate, "yyyy-MM-dd", null);
            DateTime toDate = DateTime.ParseExact(filterParams.ToDate, "yyyy-MM-dd", null);

            var filteredTransactions = _uow.TransactionRepository.GetFilteredTransactionsByUser(userId,
                fromDate, toDate, filterParams.MinAmount, filterParams.MaxAmount);
            
            if (filteredTransactions == null) return null;

            var adjustedFilteredTransactions = filteredTransactions.Select(t => 
            {
                var temp = _mapper.Map<TransactionReadDto>(t);
                temp.Type = Enum.GetName(typeof(TransactionType), t.Type);
                return temp;
            }).ToList();

            return adjustedFilteredTransactions;
        }

        public TransactionReadDto AddTransaction(TransactionCreateDto transactionCreateDto)
        {
            var transaction = _mapper.Map<Transaction>(transactionCreateDto);

            transaction = _uow.TransactionRepository.Create(transaction);

            if (transaction != null)
            {
                return _mapper.Map<TransactionReadDto>(transaction);
            }

            return null;
        }

        public bool UpdateTransaction(int id, TransactionCreateDto transactionCreateDto)
        {
            var transaction = _uow.TransactionRepository.GetById(id);

            if (transaction == null) return false;

            var transactionToUpdate = _mapper.Map<Transaction>(transactionCreateDto);
            transactionToUpdate.TransactionId = transaction.TransactionId;

            var updatedTransaction = _uow.TransactionRepository.
                                        GetTransactionItemsToBeUpdated(transaction, transactionToUpdate);

            bool successfulUpdate = _uow.TransactionRepository.Update(updatedTransaction);

            return successfulUpdate;
        }

        public bool DeleteTransaction(int id)
        {
            var transactionToDelete = _uow.TransactionRepository.GetById(id);

            if (transactionToDelete == null) return false;

            bool successfulDelete = _uow.TransactionRepository.Delete(transactionToDelete);

            return successfulDelete;
        }
    }
}