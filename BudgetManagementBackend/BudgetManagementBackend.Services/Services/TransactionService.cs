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

            var adjustedTransactions = transactions.Select(t =>
            {
                var temp = _mapper.Map<TransactionReadDto>(t);
                temp.Type = Enum.GetName(typeof(TransactionType), t.Type);
                return temp;
            }).ToList();

            return adjustedTransactions;
        }

        public TransactionReadDto AddTransaction(TransactionCreateDto transactionCreateDto)
        {
            TransactionType type = (TransactionType)Enum.Parse(typeof(TransactionType), transactionCreateDto.Type);

            DateTime date = DateTime.ParseExact(transactionCreateDto.Date, "yyyy-MM-dd", null);

            var transaction = _mapper.Map<Transaction>(transactionCreateDto);
            transaction.Type = type;
            transaction.Date = date;

            transaction = _uow.TransactionRepository.Create(transaction);

            if (transaction != null)
            {
                return _mapper.Map<TransactionReadDto>(transaction);
            }

            return null;
        }

        public bool UpdateTransaction(int id, TransactionCreateDto transactionCreateDto)
        {
            var transactionToUpdate = _uow.TransactionRepository.GetById(id);

            if (transactionToUpdate == null) return false;

            DateTime date = DateTime.ParseExact(transactionCreateDto.Date, "yyyy-MM-dd", null);

            var updatedTransaction = _mapper.Map<Transaction>(transactionCreateDto);
            updatedTransaction.TransactionId = transactionToUpdate.TransactionId;
            updatedTransaction.Date = date;

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