using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Storage.Entities;
using Storage.Repositories;
using Version = Storage.Entities.Version;

namespace Domain.Services
{
    public class AppService
    {
        private readonly IRepository<App> appRepository;
        private readonly FetcherService fetcherService;
        private readonly NotificationService notificationService;
        private readonly RatingService ratingService;
        private readonly ReviewService reviewService;
        private readonly IRepository<Rating> ratingRepository;
        private readonly IRepository<Review> reviewRepository;
        private readonly IRepository<Notification> notificationRepository;
        private readonly IRepository<Version> versionRepository;

        public AppService(IRepository<App> appRepository, FetcherService fetcherService,
            IRepository<Review> reviewRepository, IRepository<Rating> ratingRepository, ReviewService reviewService,
            RatingService ratingService, NotificationService notificationService,
            IRepository<Notification> notificationRepository, IRepository<Version> versionRepository)
        {
            this.appRepository = appRepository;
            this.fetcherService = fetcherService;
            this.reviewRepository = reviewRepository;
            this.ratingRepository = ratingRepository;
            this.reviewService = reviewService;
            this.ratingService = ratingService;
            this.notificationService = notificationService;
            this.notificationRepository = notificationRepository;
            this.versionRepository = versionRepository;
        }

        public async Task<Guid> Create(App app)
        {
            if (string.IsNullOrEmpty(app.PicUrl))
            {
                var picUrl = await fetcherService.FetchAppPicUrl(app).ConfigureAwait(false);
                app.PicUrl = picUrl;
            }

            appRepository.Create(app);

            try
            {
                var reviews = await fetcherService.FetchAppReviews(app).ConfigureAwait(false);
                var rating = await fetcherService.FetchAppRating(app).ConfigureAwait(false);
                var versions = fetcherService.GetVersionsFromReviews(reviews);
                reviewRepository.CreateRange(reviews);
                ratingRepository.CreateRange(rating);
                versionRepository.CreateRange(versions);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return app.Id;
        }

        public App Get(Guid id)
        {
            return appRepository.Get(id);
        }

        public App[] GetAppsByUser(Guid userId)
        {
            return appRepository.Find(a => a.User.Id == userId);
        }

        public App[] GetAll()
        {
            return appRepository.GetAll(true);
        }

        public async Task<string> Update(App app)
        {
            var dbApp = appRepository.Get(app.Id);
            if (string.IsNullOrEmpty(app.PicUrl) || app.PicUrl != dbApp.PicUrl)
            {
                var picUrl = await fetcherService.FetchAppPicUrl(app).ConfigureAwait(false);
                app.PicUrl = picUrl;
            }

            appRepository.Update(app);
            
            //returns new app id to update app interface (because page doesn't reload)
            return app.PicUrl;
        }

        public void Delete(Guid appId)
        {
            var app = new App {Id = appId};
            var notifications = notificationService.GetAllByApps(new []{app});
            var reviews = reviewService.GetAllByApps(new[] {app});
            var ratings = ratingService.GetAllByApps(new[] {app});
            var versions = GetAppVersions(appId);
            notificationRepository.DeleteRange(notifications.Values.SelectMany(n => n));
            reviewRepository.DeleteRange(reviews.Values.SelectMany(r => r));
            ratingRepository.DeleteRange(ratings.Values.SelectMany(r => r));
            versionRepository.DeleteRange(versions);
            appRepository.Delete(appId);
        }

        public void DeleteRange(App[] apps)
        {
            var notifications = notificationService.GetAllByApps(apps);
            var reviews = reviewService.GetAllByApps(apps);
            var ratings = ratingService.GetAllByApps(apps);
            var versions = GetVersionsByApps(apps.Select(a => a.Id));
            notificationRepository.DeleteRange(notifications.Values.SelectMany(n => n));
            reviewRepository.DeleteRange(reviews.Values.SelectMany(r => r));
            ratingRepository.DeleteRange(ratings.Values.SelectMany(r => r));
            versionRepository.DeleteRange(versions);
            appRepository.DeleteRange(apps);
        }

        public bool IsOwnedByUser(Guid userId, Guid appId)
        {
            return appRepository.Get(appId).User.Id == userId;
        }

        public Version[] GetAppVersions(Guid appId)
        {
            return versionRepository.Find(v => v.AppId == appId);
        }

        private Version[] GetVersionsByApps(IEnumerable<Guid> appsIds)
        {
            return versionRepository.Find(v => appsIds.Contains(v.AppId));
        }
    }
}