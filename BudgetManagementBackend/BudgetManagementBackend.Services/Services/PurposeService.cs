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
    public class PurposeService : IPurposeService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public PurposeService(IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
        }
        public List<PurposeDto> GetAllPurposes()
        {
            var purposes = _uow.PurposeRepository.GetAll();

            if (purposes == null) return null;

            var adjustedPurposes = purposes.Select(p =>
            {
                var temp = _mapper.Map<PurposeDto>(p);
                temp.ItemCategory.Name = Enum.GetName(typeof(CategoryName), p.ItemCategory.Name);
                return temp;
            }).ToList();

            return adjustedPurposes;
        }
    }
}