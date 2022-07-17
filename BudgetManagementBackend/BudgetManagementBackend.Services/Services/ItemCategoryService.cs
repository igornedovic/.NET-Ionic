using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Interfaces;

namespace BudgetManagementBackend.Services.Services
{
    public class ItemCategoryService : IItemCategoryService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public ItemCategoryService(IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
        }

        public List<ItemCategoryDto> GetAllItemCategories()
        {
            var itemCategories = _uow.ItemCategoryRepository.GetAll();

            if (itemCategories == null) return null;

            return _mapper.Map<List<ItemCategoryDto>>(itemCategories);
        }
    }
}