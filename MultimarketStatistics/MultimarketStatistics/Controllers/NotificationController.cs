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
        private readonly NotificationService notificationService;

        public NotificationController(NotificationService notificationService, IMapper mapper)
        {
            this.notificationService = notificationService;
            this.mapper = mapper;
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
        [HttpDelete("{userId}")]
        public ActionResult Delete(Guid userId, [FromQuery(Name = "id")] IEnumerable<Guid> notificationIds)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId))
                return StatusCode(StatusCodes.Status403Forbidden);
            notificationService.Delete(notificationIds.Select(id => new Notification { Id = id }));
            return new OkResult();
        }

        [Authorize]
        [HttpDelete("{userId}/all")]
        public ActionResult DeleteByUser(Guid userId)
        {
            if (!UserIdValidator.IsValidAction(HttpContext, userId))
                return StatusCode(StatusCodes.Status403Forbidden);
            notificationService.DeleteByUser(userId);
            return new OkResult();
        }
    }
}