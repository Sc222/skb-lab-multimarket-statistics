using System;
using System.Collections.Generic;
using System.Linq;
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
    public class NotificationController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly AppService appService;
        private readonly NotificationService notificationService;

        public NotificationController(NotificationService notificationService, IMapper mapper, AppService appService)
        {
            this.notificationService = notificationService;
            this.mapper = mapper;
            this.appService = appService;
        }

        [Authorize]
        [HttpGet("{userId}")]
        public ActionResult<NotificationContract[]> GetUserNotifications(Guid userId)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId))
                return StatusCode(StatusCodes.Status403Forbidden);
            var notifications = notificationService.GetNotificationsByUser(userId);
            return mapper.Map<NotificationContract[]>(notifications);
        }

        [Authorize]
        [HttpDelete("{userId}/{appId}/{notificationId}")]
        public ActionResult Delete(Guid userId, Guid appId, Guid notificationId)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId) ||
                !appService.IsOwnedByUser(userId, appId) ||
                !notificationService.IsOwnedByApp(notificationId, appId))
                return StatusCode(StatusCodes.Status403Forbidden);

            notificationService.Delete(notificationId);
            return new OkResult();
        }

        [Authorize]
        [HttpDelete("{userId}/{appId}")]
        public ActionResult Delete(Guid userId, Guid appId)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId) ||
                !appService.IsOwnedByUser(userId, appId))
                return StatusCode(StatusCodes.Status403Forbidden);

            notificationService.DeleteByApp(appId);
            return new OkResult();
        }

        [Authorize]
        [HttpDelete("{userId}")]
        public ActionResult DeleteByUser(Guid userId)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId))
                return StatusCode(StatusCodes.Status403Forbidden);

            notificationService.DeleteByUser(userId);
            return new OkResult();
        }
    }
}