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

        public List<Transaction> GetAllTransactionByUser()
        {
            throw new NotImplementedException();
        }

        public TransactionReadDto AddTransaction(TransactionCreateDto transactionCreateDto)
        {
            TransactionType type = (TransactionType)Enum.Parse(typeof(TransactionType), transactionCreateDto.Type);
            
            DateTime date = DateTime.ParseExact(transactionCreateDto.Date, "MM/dd/yyyy", null);
            
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

    }
}