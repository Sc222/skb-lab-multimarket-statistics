using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using MultimarketStatistics.Models;
using Storage.Entities;

namespace MultimarketStatistics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController
    {
        private readonly IMapper mapper;
        private readonly NotificationService notificationService;

        public NotificationController(NotificationService notificationService, IMapper mapper)
        {
            this.notificationService = notificationService;
            this.mapper = mapper;
        }

        [HttpGet("{userId}")]
        public NotificationContract[] GetUserNotifications(Guid userId)
        {
            var notifications = notificationService.GetNotificationsByUser(userId);
            return mapper.Map<NotificationContract[]>(notifications);
        }

        [HttpDelete]
        public void Delete([FromQuery(Name = "id")] IEnumerable<Guid> notificationIds)
        {
            notificationService.Delete(notificationIds.Select(id => new Notification {Id = id}));
        }
    }
}