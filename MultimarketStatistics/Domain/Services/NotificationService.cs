﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Storage.Entities;
using Storage.Repositories;

namespace Domain.Services
{
    public class NotificationService
    {
        private readonly IRepository<Notification> notificationRepository;
        private readonly AppService appService;

        public NotificationService(IRepository<Notification> notificationRepository, AppService appService)
        {
            this.notificationRepository = notificationRepository;
            this.appService = appService;
        }

        public Notification[] GetNotificationsByUser(Guid userId)
        {
            var userApps = appService.GetAppsByUser(userId);
            return notificationRepository.Find(n => userApps.Contains(n.App));
        }

        public void Delete(IEnumerable<Notification> notifications)
        {
            notificationRepository.DeleteRange(notifications);
        }

        public void CreateRange(IEnumerable<Notification> notifications)
        {
            notificationRepository.CreateRange(notifications);
        }

        public IEnumerable<Notification> GetNotificationsFromReviews(App app, IEnumerable<Review> newReviews)
        {
            return newReviews.GroupBy(r => r.Market)
                .Select(g => new Notification
                {
                    App = app,
                    Title = $"New {g.Key.ToStringMarket()} reviews!",
                    Text = $"New {g.Count()} reviews for {app.Name}"
                });
        }
    }
}