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

            CreateMap<TransactionCreateDto, Transaction>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src =>
                    (TransactionType)Enum.Parse(typeof(TransactionType), src.Type)));
            CreateMap<Transaction, TransactionReadDto>();

            CreateMap<TransactionItemCreateDto, TransactionItem>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src =>
                     DateTime.ParseExact(src.Date, "yyyy-MM-dd", null)));
            CreateMap<TransactionItem, TransactionItemReadDto>();

            CreateMap<ItemCategory, ItemCategoryDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src =>
                    src.Name));
            CreateMap<Purpose, PurposeDto>();
        }
    }
}