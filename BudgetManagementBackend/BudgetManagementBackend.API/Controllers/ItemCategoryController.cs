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
    public class ItemCategoryController : ControllerBase
    {
        private readonly IItemCategoryService _itemCategoryService;
        public ItemCategoryController(IItemCategoryService itemCategoryService)
        {
            _itemCategoryService = itemCategoryService;  
        }

        // GET api/itemCategory
        [HttpPost]
        public ActionResult<List<ItemCategoryDto>> GetAllItemCategories()
        {
            var itemCategories = _itemCategoryService.GetAllItemCategories();

            if (itemCategories == null || itemCategories.Count == 0) 
                return NotFound("No item categories found");

            return Ok(itemCategories);
        }
    }
}