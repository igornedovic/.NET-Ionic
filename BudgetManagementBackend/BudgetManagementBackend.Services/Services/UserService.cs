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
        private readonly ITokenService _tokenService;
        public UserService(IUnitOfWork uow, IMapper mapper, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _uow = uow;

        }

        public bool CheckUsername(string username)
        {
            return _uow.UserRepository.CheckUsername(username);
        }

        public UserReadDto Register(UserCreateDto userCreateDto)
        {
            using var hmac = new HMACSHA512();

            var user = _mapper.Map<User>(userCreateDto);

            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userCreateDto.Password));
            user.PasswordSalt = hmac.Key;

            var registeredUser = _uow.UserRepository.Create(user);

            if (registeredUser != null)
            {
                return _mapper.Map<UserReadDto>(registeredUser);
            }

            return null;
        }
        public User GetUserByUsername(string username)
        {
            return _uow.UserRepository.GetUserByUsername(username);
        }

        public UserReadDto Login(User user, string password)
        {
            using var hmac = new HMACSHA512(user.PasswordSalt);

            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            for (int i = 0; i < computedHash.Length; i++) {
                if (computedHash[i] != user.PasswordHash[i]) return null;
            }

            var token = _tokenService.CreateToken(user);

            var loggedInUser = _mapper.Map<UserReadDto>(user);
            loggedInUser.Token = token;

            return loggedInUser;
        }

        public bool UpdateUser(int id, UserCreateDto user)
        {
            var userToUpdate = _uow.UserRepository.GetById(id);

            if (userToUpdate == null) return false;

            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Email = user.Email;
            userToUpdate.Username = user.Username;

            bool successfulUpdate = _uow.UserRepository.Update(userToUpdate);

            return successfulUpdate;
        }
    }

}