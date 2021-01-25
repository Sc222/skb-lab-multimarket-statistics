﻿using System;
using System.Collections.Generic;
using System.Linq;
using Storage.Entities;
using Storage.Repositories;

namespace Domain.Services
{
    public class NotificationService
    {
        private readonly IRepository<Notification> notificationRepository;

        public NotificationService(IRepository<Notification> notificationRepository)
        {
            this.notificationRepository = notificationRepository;
        }

        public Notification[] GetNotificationsByUser(Guid userId)
        {
            return notificationRepository.Find(n => n.User.Id == userId);
        }

        public Dictionary<Guid, Notification[]> GetAllByApps(IEnumerable<App> apps)
        {
            return notificationRepository.Find(n => apps.Contains(n.App)).GroupBy(n => n.App.Id)
                .ToDictionary(g => g.Key, g => g.ToArray());
        }

        public Notification[] GetNotCheckedNotificationsByUsers(Guid[] userIds)
        {
            return notificationRepository.Find(n => userIds.Contains(n.User.Id) && !n.IsChecked);
        }

        public void Delete(IEnumerable<Notification> notifications)
        {
            notificationRepository.DeleteRange(notifications);
        }

        public void DeleteByUser(Guid userId)
        {
            var notificationsToDelete = notificationRepository.Find(n => n.User.Id == userId);
            notificationRepository.DeleteRange(notificationsToDelete);
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
                    User = app.User,
                    Title = $"New {g.Key.ToStringMarket()} reviews!",
                    Text = $"New {g.Count()} reviews for {app.Name}"
                });
        }
    }
}