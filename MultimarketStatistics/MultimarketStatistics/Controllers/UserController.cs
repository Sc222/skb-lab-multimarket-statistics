using System;
using AutoMapper;
using Domain.Services;
using Microsoft.AspNetCore.Http;
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
        public ActionResult<Guid> Create([FromBody] UserContract webUser)
        {
            var user = mapper.Map<User>(webUser);
            return userService.Create(user);
        }

        //[Authorize]
        [HttpPut("update")]
        public ActionResult Update([FromBody] UserUpdateContract webUser)
        {
            //if (!UserIdValidator.IsValidAction(HttpContext, userId))
            //    return StatusCode(StatusCodes.Status403Forbidden);
            var userToUpdate = userService.Get(webUser.Id);

            if (string.IsNullOrEmpty(webUser.CurrentPassword))
                return BadRequest();

            if (userToUpdate.Password != webUser.CurrentPassword)
                return StatusCode(StatusCodes.Status403Forbidden);

            var user = mapper.Map<User>(webUser);
            if (string.IsNullOrEmpty(user.Password))
                user.Password = webUser.CurrentPassword;

            userService.Update(user);
            return Ok();
        }

        //[Authorize]
        [HttpGet("{userId}")]
        public ActionResult<UserContract> Get(Guid userId)
        {
            //if (!UserIdValidator.IsValidAction(HttpContext, userId))
            //    return StatusCode(StatusCodes.Status403Forbidden);
            var user = userService.Get(userId);
            return mapper.Map<UserContract>(user);
        }

        [HttpPost("authenticate")]
        public ActionResult Authenticate([FromBody] UserContract user)
        {
            var response = userService.Authenticate(mapper.Map<User>(user));

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
    }
}