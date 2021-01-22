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

        [HttpPut("update")]
        public void Update([FromBody] UserContract webUser)
        {
            var user = mapper.Map<User>(webUser);
            userService.Update(user);
        }

        [HttpGet("{userId}")]
        public UserContract Get(Guid userId)
        {
            var user = userService.Get(userId);
            return mapper.Map<UserContract>(user);
        }
    }
}