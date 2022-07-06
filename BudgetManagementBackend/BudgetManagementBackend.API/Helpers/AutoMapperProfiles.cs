using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserCreateDto, User>();
            CreateMap<User, UserReadDto>();
            CreateMap<TransactionCreateDto, Transaction>();
            CreateMap<Transaction, TransactionReadDto>();
        }
    }
}