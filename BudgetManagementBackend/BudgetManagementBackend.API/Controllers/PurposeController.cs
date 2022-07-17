using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetManagementBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurposeController : ControllerBase
    {
        private readonly IPurposeService _purposeService;
        public PurposeController(IPurposeService purposeService)
        {
            _purposeService = purposeService;
        }

        // GET api/purpose
        [HttpGet]
        public ActionResult<List<PurposeDto>> GetAllItemCategories()
        {
            var purposes = _purposeService.GetAllPurposes();

            if (purposes == null || purposes.Count == 0)
                return NotFound("No item categories found");

            return Ok(purposes);
        }
    }
}