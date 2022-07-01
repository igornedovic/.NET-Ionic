using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Data.Interfaces
{
    public interface IUserService
    {
        public UserReadDto Register(UserCreateDto user);
        public bool CheckUsername(string username);
        public User GetUserByUsername(string username);
        public UserReadDto Login(User user, string password);
    }
}