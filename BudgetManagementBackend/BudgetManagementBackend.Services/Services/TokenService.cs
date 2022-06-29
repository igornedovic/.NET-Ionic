using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BudgetManagementBackend.Data.Interfaces;
using BudgetManagementBackend.Data.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BudgetManagementBackend.Services.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration config;

        public TokenService(IConfiguration config)
        {
            this.config = config;
        }
        public string CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(config["Secret:Key"]);

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, user.Role));

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims, JwtBearerDefaults.AuthenticationScheme),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}