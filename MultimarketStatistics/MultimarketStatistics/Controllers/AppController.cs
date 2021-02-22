using System;
using System.Threading.Tasks;
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
    public class AppController : ControllerBase
    {
        private readonly AppService appService;
        private readonly IMapper mapper;

        public AppController(AppService appService, IMapper mapper)
        {
            this.appService = appService;
            this.mapper = mapper;
        }

        [Authorize]
        [HttpPost("create/{userId}")]
        public async Task<ActionResult<Guid>> Create(Guid userId, [FromBody] AppContract webApp)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId))
                return StatusCode(StatusCodes.Status403Forbidden);
            var app = mapper.Map<App>(webApp);
            app.User = new User { Id = userId };
            return await appService.Create(app).ConfigureAwait(false);
        }

        [Authorize]
        [HttpPut("update/{userId}")]
        public async Task<ActionResult<string>> Update(Guid userId, [FromBody] AppContract webApp)
        {
            if (!IsValidAction(userId, webApp.Id))
                return StatusCode(StatusCodes.Status403Forbidden);

            var app = mapper.Map<App>(webApp);
            app.User = new User { Id = userId };
            return await appService.Update(app).ConfigureAwait(false);
        }

        [Authorize]
        [HttpGet("{userId}/apps")]
        public ActionResult<AppContract[]> GetUserApps(Guid userId)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId))
                return StatusCode(StatusCodes.Status403Forbidden);

            var apps = appService.GetAppsByUser(userId);
            return mapper.Map<AppContract[]>(apps);
        }

        [Authorize]
        [HttpGet("{userId}/{appId}")]
        public ActionResult<AppContract> Get(Guid userId, Guid appId)
        {
            if (!IsValidAction(userId, appId))
                return StatusCode(StatusCodes.Status403Forbidden);

            var app = appService.Get(appId);
            return mapper.Map<AppContract>(app);
        }

        [Authorize]
        [HttpDelete("{userId}/{appId}")]
        public ActionResult Delete(Guid userId, Guid appId)
        {
            if (!IsValidAction(userId, appId))
                return StatusCode(StatusCodes.Status403Forbidden);

            appService.Delete(appId);
            return Ok();
        }

        private bool IsValidAction(Guid userId, Guid appId)
        {
            return UserIdValidator.IsValidAction(HttpContext, userId) && appService.IsOwnedByUser(userId, appId);
        }
    }
}