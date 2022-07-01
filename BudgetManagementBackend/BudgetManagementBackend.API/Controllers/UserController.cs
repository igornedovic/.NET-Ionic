using BudgetManagementBackend.Data.DTOs;
using BudgetManagementBackend.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetManagementBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public UserController(IUserService userService, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        // POST api/user/register
        [HttpPost("register")]
        public ActionResult<UserReadDto> Register(UserCreateDto userCreateDto) 
        {
            if (_userService.CheckUsername(userCreateDto.Username)) 
                return BadRequest("This username already exists!");
            
            var registeredUser = _userService.Register(userCreateDto);

            if (registeredUser != null) {
                return Ok(registeredUser);
            }

            return BadRequest("Unable to register new user!");
        }
    }
}