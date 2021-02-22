using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MoreLinq;
using Storage.Entities;
using Storage.Repositories;
using Version = Storage.Entities.Version;

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
        private readonly IRepository<Version> versionRepository;

        public Worker(ILogger<Worker> logger, AppService appService, ReviewService reviewService,
            RatingService ratingService, NotificationService notificationService,
            FetcherService fetcherService, IRepository<Version> versionRepository)
        {
            _logger = logger;
            this.appService = appService;
            this.reviewService = reviewService;
            this.ratingService = ratingService;
            this.notificationService = notificationService;
            this.fetcherService = fetcherService;
            this.versionRepository = versionRepository;
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

                var reviewsToAdd = new List<Review>();
                var ratingsToAdd = new List<Rating>();
                var notificationsToAdd = new List<Notification>();
                var versionsToAdd = new List<Version>();

                try
                {
                    foreach (var app in apps)
                    {
                        lastRecordedReviewsIds.TryGetValue(app.Id, out var lastAppReviewIds);
                        var newReviews = await fetcherService.FetchAppReviews(app, lastAppReviewIds)
                            .ConfigureAwait(false);
                        reviewsToAdd.AddRange(newReviews);

                        ratingsToAdd.AddRange(await fetcherService
                            .FetchAppRating(app).ConfigureAwait(false));

                        notificationsToAdd.AddRange(notificationService.GetNotificationsFromReviews(app, newReviews));

                        var appVersions = MoreEnumerable.ToHashSet(appService.GetAppVersions(app.Id).Select(v => new {v.Market, v.Number}));
                        var foundVersions = fetcherService.GetVersionsFromReviews(newReviews);
                        versionsToAdd.AddRange(foundVersions.Where(v => !appVersions.Contains(new {v.Market, v.Number})));
                    }


                    reviewService.CreateRange(reviewsToAdd);
                    ratingService.CreateRange(ratingsToAdd);
                    notificationService.CreateRange(notificationsToAdd);
                    versionRepository.CreateRange(versionsToAdd);
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