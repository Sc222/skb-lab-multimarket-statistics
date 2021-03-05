using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MultimarketStatistics.Models;
using Storage.Entities;
using Version = Storage.Entities.Version;

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

        [Authorize]
        [HttpGet("{userId}/{appId}/versions")]
        public ActionResult<string[]> GetAppVersions(Guid userId, Guid appId, [FromQuery] string market)
        {
            if (!IsValidAction(userId, appId))
                return StatusCode(StatusCodes.Status403Forbidden);

            var versions = appService.GetAppVersions(appId).ToList();

            versions.Sort(CompareVersions);

            return versions.Where(v => v.Market == market.ToMarketType())
                .Select(v => v.Number)
                .Reverse()
                .ToArray();
        }

        private bool IsValidAction(Guid userId, Guid appId)
        {
            return UserIdValidator.IsValidAction(HttpContext, userId) && appService.IsOwnedByUser(userId, appId);
        }

        private int CompareVersions(Version first, Version second)
        {
            var v1 = first.Number?.Split('.');
            var v2 = second.Number?.Split('.');

            if (v1 == null || v1.Length == 0)
            {
                if (v2 == null || v2.Length == 0)
                    return v1 != null && v2 != null ? first.Number.CompareTo(second.Number) : 0;
                return 1;
            }

            if (v2 == null || v2.Length == 0)
                return -1;

            for (var part = 0; part < v1.Length; ++part)
            {
                if (v2.Length == part)
                    return 1;

                var compareResult = CompareParts(v1[part], v2[part]);

                if (compareResult != 0 || v1.Length == v2.Length && part == v1.Length - 1)
                    return compareResult;
            }

            return -1;
        }

        private int CompareParts(string first, string second)
        {
            var isSecondParsable = int.TryParse(second, out var p2);
            if (int.TryParse(first, out var p1))
            {
                if (isSecondParsable)
                    return p1.CompareTo(p2);
                return -1;
            }

            if (isSecondParsable)
                return 1;

            return first.CompareTo(second);
        }
    }
}