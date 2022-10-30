using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(BudgetDbContext context)
        {
            if (context.ItemCategories.Any()) return;

            var itemCategories = new List<ItemCategory>
            {
                new ItemCategory
                {
                    Name = CategoryName.PersonalIncome
                },
                new ItemCategory
                {
                    Name = CategoryName.BusinessIncome
                },
                new ItemCategory
                {
                    Name = CategoryName.PersonalExpense
                },
                new ItemCategory
                {
                    Name = CategoryName.BusinessExpense
                }
            };

            foreach (var itemCategory in itemCategories)
            {
                context.ItemCategories.Add(itemCategory);
            }

            context.SaveChanges();

            if (context.Purposes.Any()) return;

            var purposes = new List<Purpose>
            {
                new Purpose
                {
                    ItemCategoryId = 1,
                    Name = "Bank loan"
                },
                new Purpose
                {
                    ItemCategoryId = 3,
                    Name = "Bills"
                },
                new Purpose
                {
                    ItemCategoryId = 2,
                    Name = "Bonus"
                },
                new Purpose
                {
                    ItemCategoryId = 3,
                    Name = "Food"
                },
                new Purpose
                {
                    ItemCategoryId = 1,
                    Name = "Gift"
                },
                new Purpose
                {
                    ItemCategoryId = 3,
                    Name = "Holiday"
                },
                new Purpose
                {
                    ItemCategoryId = 1,
                    Name = "House rent"
                },
                new Purpose
                {
                    ItemCategoryId = 2,
                    Name = "Salary"
                },
                new Purpose
                {
                    ItemCategoryId = 3,
                    Name = "Shopping"
                }
            };

            foreach(var purpose in purposes)
            {
                context.Purposes.Add(purpose);
            }

            context.SaveChanges();
        }
    }
}