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

        public UserController(IUserService userService, ITokenService tokenService)
        {
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

        // POST api/user/login
        [HttpPost("login")]
        public ActionResult<UserReadDto> Login(LoginDto loginDto)
        {
            var user = _userService.GetUserByUsername(loginDto.Username); 

            if (user == null) return Unauthorized("Invalid username!");

            var loggedInUser = _userService.Login(user, loginDto.Password);

            if (loggedInUser == null) return Unauthorized("Invalid password!");

            return Ok(loggedInUser);
        }
    }
}