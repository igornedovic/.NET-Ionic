using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;

namespace BudgetManagementBackend.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public UserService(IUnitOfWork uow, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;

        }

        public bool CheckUsername(string username)
        {
            return _uow.UserRepository.CheckUsername(username);
        }

        public UserReadDto Login(string username)
        {
            throw new NotImplementedException();
        }

        public UserReadDto Register(UserCreateDto userCreateDto)
        {
            using var hmac = new HMACSHA512();

            var user = _mapper.Map<User>(userCreateDto);

            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userCreateDto.Password));
            user.PasswordSalt = hmac.Key;

            var registeredUser = _uow.UserRepository.Create(user);

            if (registeredUser != null) {
                return _mapper.Map<UserReadDto>(registeredUser);
            }

            return null;
        }
    }
}