using System;
using System.Collections.Generic;
using System.Linq;
using BudgetManagementBackend.Data;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Services.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BudgetDbContext _context;

        public UserRepository(BudgetDbContext context)
        {
            _context = context;

        }

        public bool CheckUsername(string username)
        {
            try
            {
                return _context.Users.Any(u => u.Username == username);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public User Create(User user)
        {
            try
            {
                _context.Add(user);
                _context.SaveChanges();
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public User GetUserByUsername(string username)
        {
            try
            {
                return _context.Users.SingleOrDefault(u => u.Username == username);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}