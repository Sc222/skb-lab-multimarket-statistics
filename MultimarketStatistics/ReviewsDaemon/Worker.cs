using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Domain.Clients;
using Domain.Clients.AppGallery;
using Domain.Clients.AppStore;
using Domain.Clients.PlayMarket;
using Domain.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MoreLinq;
using Storage.Entities;

namespace ReviewsDaemon
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly AppService appService;
        private readonly ReviewService reviewService;
        private readonly RatingService ratingService;
        private readonly NotificationService notificationService;
        private readonly AppGalleryClient appGallery;
        private readonly PlayMarketClient playMarket;
        private readonly AppStoreClient appStore;

        public Worker(ILogger<Worker> logger, AppService appService, AppGalleryClient appGallery,
            PlayMarketClient playMarket, AppStoreClient appStore, ReviewService reviewService,
            RatingService ratingService, NotificationService notificationService)
        {
            _logger = logger;
            this.appService = appService;
            this.appGallery = appGallery;
            this.playMarket = playMarket;
            this.appStore = appStore;
            this.reviewService = reviewService;
            this.ratingService = ratingService;
            this.notificationService = notificationService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                var apps = appService.GetAll();
                var reviews = reviewService.GetAllByApps(apps);
                var lastRecordedReviewsIds = reviews.ToDictionary(kvp => kvp.Key.Id, kvp => kvp.Value
                    .GroupBy(r => r.Market)
                    .ToDictionary(g => g.Key, g => g
                        .OrderByDescending(r => r.Date)
                        .First()));
                var appleReviewsByApp = reviews.ToDictionary(kvp => kvp.Key.Id,
                    kvp => kvp.Value.Where(r => r.Market == MarketType.AppStore).ToArray());
                var reviewsToAdd = new List<Review>();
                var ratingsToAdd = new List<Rating>();
                var notificationsToAdd = new List<Notification>();
                foreach (var app in apps)
                {
                    if (!string.IsNullOrEmpty(app.AppStoreId))
                    {
                        var newReviews = (await GetReviews(app, lastRecordedReviewsIds, appStore, MarketType.AppStore).ConfigureAwait(false)).ToArray();
                        reviewsToAdd.AddRange(newReviews);
                        if (newReviews.Length != 0)
                        {
                            var rating = GetAppStoreRating(appleReviewsByApp, app, newReviews);
                            ratingsToAdd.Add(rating);
                            notificationsToAdd.Add(new Notification { App = app, Title = "new reviews", Text = $"new {newReviews.Length} reviews from AppStore" });
                        }
                    }
                    if (!string.IsNullOrEmpty(app.AppGalleryId))
                    {
                        var newReviews = (await GetReviews(app, lastRecordedReviewsIds, appGallery, MarketType.AppGallery).ConfigureAwait(false)).ToArray();
                        reviewsToAdd.AddRange(newReviews);
                        ratingsToAdd.Add(await appGallery.GetAppRatingAsync(app).ConfigureAwait(false));
                        if (newReviews.Length != 0)
                            notificationsToAdd.Add(new Notification { App = app, Title = "new reviews", Text = $"new {newReviews.Length} reviews from AppGallery" });
                    }
                    if (!string.IsNullOrEmpty(app.PlayMarketId))
                    {
                        var newReviews = (await GetReviews(app, lastRecordedReviewsIds, playMarket, MarketType.PlayMarket).ConfigureAwait(false)).ToArray();
                        reviewsToAdd.AddRange(newReviews);
                        ratingsToAdd.Add(await playMarket.GetAppRatingAsync(app).ConfigureAwait(false));
                        if (newReviews.Length != 0)
                            notificationsToAdd.Add(new Notification { App = app, Title = "new reviews", Text = $"new {newReviews.Length} reviews from PlayMarket" });
                    }
                }

                try
                {
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

        private static Rating GetAppStoreRating(Dictionary<Guid, Review[]> appleReviewsByApp, App app, Review[] newReviews)
        {
            var scores = appleReviewsByApp.ContainsKey(app.Id) ? appleReviewsByApp[app.Id].GroupBy(r => r.Rating)
                .ToDictionary(g => g.Key, g => g.Count()) : new Dictionary<int, int> {{1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}};

            var newScores = newReviews.GroupBy(r => r.Rating)
                .ToDictionary(g => g.Key, g => g.Count());

            foreach (var (score, count) in newScores)
                if (scores.ContainsKey(score))
                    scores[score] += count;
                else
                    scores[score] = count;

            return new Rating
            {
                App = app,
                Date = DateTime.Now,
                Market = MarketType.AppStore,
                Total = scores.Select(kvp => kvp.Value).Sum(),
                FiveStarsCount = scores[5],
                FourStarsCount = scores[4],
                ThreeStarsCount = scores[3],
                TwoStarsCount = scores[2],
                OneStarsCount = scores[1]
            };
        }

        private async Task<IEnumerable<Review>> GetReviews(App app, Dictionary<Guid, Dictionary<MarketType, Review>> lastRecordedReviewsIds,
            IMarketClient marketClient, MarketType market)
        {
            var reviews = await marketClient.GetAppReviewsAsync(app, 10).ConfigureAwait(false); //поправить 10
            var lastReviewId = lastRecordedReviewsIds.ContainsKey(app.Id)
                ? lastRecordedReviewsIds[app.Id].ContainsKey(market)
                    ? lastRecordedReviewsIds[app.Id][market].MarketReviewId
                    : string.Empty
                : string.Empty;
            var newReviews = reviews.TakeWhile(r => r.MarketReviewId != lastReviewId);
            return newReviews;
        }

        //private Review[] ge
    }
}
