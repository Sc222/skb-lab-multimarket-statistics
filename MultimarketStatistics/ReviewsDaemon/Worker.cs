using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Storage.Entities;

namespace ReviewsDaemon
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly AppService appService;
        private readonly FetcherService fetcherService;
        private readonly NotificationService notificationService;
        private readonly RatingService ratingService;
        private readonly ReviewService reviewService;

        public Worker(ILogger<Worker> logger, AppService appService, ReviewService reviewService,
            RatingService ratingService, NotificationService notificationService, FetcherService fetcherService)
        {
            _logger = logger;
            this.appService = appService;
            this.reviewService = reviewService;
            this.ratingService = ratingService;
            this.notificationService = notificationService;
            this.fetcherService = fetcherService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                var apps = appService.GetAll();
                var reviews = reviewService.GetAllByApps(apps);
                var lastRecordedReviewsIds = reviews.ToDictionary(kvp => kvp.Key, kvp => kvp.Value
                    .GroupBy(r => r.Market)
                    .ToDictionary(g => g.Key, g => g
                        .OrderByDescending(r => r.Date)
                        .First()));
                var appStoreReviewsByApp = reviews.ToDictionary(kvp => kvp.Key,
                    kvp => kvp.Value.Where(r => r.Market == MarketType.AppStore).ToArray());

                var reviewsToAdd = new List<Review>();
                var ratingsToAdd = new List<Rating>();
                var notificationsToAdd = new List<Notification>();

                try
                {
                    foreach (var app in apps)
                    {
                        lastRecordedReviewsIds.TryGetValue(app.Id, out var lastAppReviewIds);
                        var newReviews = await fetcherService.FetchAppReviews(app, lastAppReviewIds)
                            .ConfigureAwait(false);
                        reviewsToAdd.AddRange(newReviews);

                        var newAppStoreReviews = newReviews.Where(r => r.Market == MarketType.AppStore);
                        appStoreReviewsByApp.TryGetValue(app.Id, out var appStoreAppReviews);
                        ratingsToAdd.AddRange(await fetcherService
                            .FetchAppRating(app, appStoreAppReviews, newAppStoreReviews).ConfigureAwait(false));

                        notificationsToAdd.AddRange(notificationService.GetNotificationsFromReviews(app, newReviews));
                    }


                    reviewService.CreateRange(reviewsToAdd);
                    ratingService.CreateRange(ratingsToAdd);
                    notificationService.CreateRange(notificationsToAdd);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }

                _logger.LogInformation("Finished writing at {time}", DateTimeOffset.Now);
                await Task.Delay(TimeSpan.FromHours(1), stoppingToken).ConfigureAwait(false);
            }
        }
    }
}