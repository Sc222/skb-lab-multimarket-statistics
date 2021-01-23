using System;
using AutoMapper;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using MultimarketStatistics.Models;
using Storage.Entities;

namespace MultimarketStatistics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly UserService userService;

        public UserController(UserService userService, IMapper mapper)
        {
            this.userService = userService;
            this.mapper = mapper;
        }

        [HttpPost("create")]
        public Guid Create([FromBody] UserContract webUser)
        {
            var user = mapper.Map<User>(webUser);
            return userService.Create(user);
        }

        //[Authorize]
        [HttpPut("update")]
        public void Update([FromBody] UserContract webUser)
        {
            var user = mapper.Map<User>(webUser);
            userService.Update(user);
        }

        //[Authorize]
        [HttpGet("{userId}")]
        public UserContract Get(Guid userId)
        {
            var user = userService.Get(userId);
            return mapper.Map<UserContract>(user);
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserContract user)
        {
            var response = userService.Authenticate(mapper.Map<User>(user));

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
    }
}