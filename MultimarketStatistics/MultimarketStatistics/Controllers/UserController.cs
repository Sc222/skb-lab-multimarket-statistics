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
            var checkResult = userService.CheckForUniqueness(user.Email, user.Username);

            if (!checkResult.IsEmailUnique || !checkResult.IsUsernameUnique)
                return Conflict(checkResult);

            return userService.Create(user);
        }

        [Authorize]
        [HttpPut("update")]
        public ActionResult Update([FromBody] UserUpdateContract webUser)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, webUser.Id))
                return StatusCode(StatusCodes.Status403Forbidden);
            var userToUpdate = userService.Get(webUser.Id);

            if (string.IsNullOrEmpty(webUser.CurrentPassword))
                return BadRequest();

            if (userToUpdate.Password != webUser.CurrentPassword)
                return StatusCode(StatusCodes.Status403Forbidden);

            var checkResult = userService.CheckForUniqueness(webUser.NewEmail, webUser.NewUsername);

            if ((!checkResult.IsEmailUnique && !string.IsNullOrEmpty(webUser.NewEmail)) ||
                (!checkResult.IsUsernameUnique && !string.IsNullOrEmpty(webUser.NewUsername)))
                return Conflict(checkResult);

            var user = mapper.Map<User>(webUser);

            if (string.IsNullOrEmpty(user.Password))
                user.Password = webUser.CurrentPassword;

            if (!string.IsNullOrEmpty(webUser.NewEmail))
                user.Email = webUser.NewEmail;

            if (!string.IsNullOrEmpty(webUser.NewUsername))
                user.Username = webUser.NewUsername;

            userService.Update(user);
            return Ok();
        }

        [Authorize]
        [HttpGet("{userId}")]
        public ActionResult<UserContract> Get(Guid userId)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId))
                return StatusCode(StatusCodes.Status403Forbidden);
            var user = userService.Get(userId);
            return mapper.Map<UserContract>(user);
        }

        [Authorize]
        [HttpDelete("{userId}")]
        public ActionResult Delete(Guid userId)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId))
                return StatusCode(StatusCodes.Status403Forbidden);
            userService.Delete(userId);
            return Ok();
        }

        [HttpPost("authenticate")]
        public ActionResult<AuthResult> Authenticate([FromBody] UserContract user)
        {
            var response = userService.Authenticate(user.Username, user.Password);

            if (response == null)
                return BadRequest(new 
                { 
                    message = "Username or password is incorrect" 
                });

            return Ok(new AuthResult
            {
                User = mapper.Map<UserContract>(response.Value.User),
                Token = response.Value.Token,
                Expires = response.Value.Expires
            });
        }
    }
}