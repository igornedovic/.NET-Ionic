using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.DTOs;

namespace BudgetManagementBackend.Data.Interfaces
{
    public interface IPurposeService
    {
        public List<PurposeDto> GetAllPurposes();
    }
}