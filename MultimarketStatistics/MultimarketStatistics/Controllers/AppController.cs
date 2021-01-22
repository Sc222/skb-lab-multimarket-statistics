using System;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Services;
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

        //[Authorize]
        [HttpPost("create/{userId}")]
        public async Task<Guid> Create(Guid userId, [FromBody] AppContract webApp)
        {
            var app = mapper.Map<App>(webApp);
            app.User = new User {Id = userId};
            return await appService.Create(app).ConfigureAwait(false);
        }

        //[Authorize]
        [HttpPut("update/{userId}")]
        public void Update(Guid userId, [FromBody] AppContract webApp)
        {
            var app = mapper.Map<App>(webApp);
            app.User = new User {Id = userId};
            appService.Update(app);
        }

        //[Authorize]
        [HttpGet("{userId}/apps")]
        public AppContract[] GetUserApps(Guid userId)
        {
            var apps = appService.GetAppsByUser(userId);
            return mapper.Map<AppContract[]>(apps);
        }

        //[Authorize]
        [HttpGet("{appId}")]
        public AppContract Get(Guid appId)
        {
            var app = appService.Get(appId);
            return mapper.Map<AppContract>(app);
        }
    }
}