using System;
using Domain.Clients.AppGallery;
using Domain.Clients.AppStore;
using Domain.Clients.PlayMarket;
using Storage.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class FetcherService
    {
        private readonly AppGalleryClient appGallery;
        private readonly PlayMarketClient playMarket;
        private readonly AppStoreClient appStore;

        public FetcherService(AppStoreClient appStore, PlayMarketClient playMarket, AppGalleryClient appGallery)
        {
            this.appStore = appStore;
            this.playMarket = playMarket;
            this.appGallery = appGallery;
        }

        public async Task<List<Review>> FetchAppReviews(App app, Dictionary<MarketType, Review> lastRecordedReviewsIds = null)
        {
            var result = new List<Review>();

            if (!string.IsNullOrEmpty(app.AppStoreId))
                result.AddRange(await GetReviews(app, lastRecordedReviewsIds, appStore, MarketType.AppStore).ConfigureAwait(false));

            if (!string.IsNullOrEmpty(app.AppGalleryId))
                result.AddRange(await GetReviews(app, lastRecordedReviewsIds, appGallery, MarketType.AppGallery).ConfigureAwait(false));

            if (!string.IsNullOrEmpty(app.PlayMarketId))
                result.AddRange(await GetReviews(app, lastRecordedReviewsIds, playMarket, MarketType.PlayMarket).ConfigureAwait(false));

            return result;
        }

        private async Task<IEnumerable<Review>> GetReviews(App app, Dictionary<MarketType, Review> lastRecordedReviewsIds,
            IMarketClient marketClient, MarketType market)
        {
            var reviews = await marketClient.GetAppReviewsAsync(app, 10).ConfigureAwait(false); //поправить 10
            var lastReviewId = lastRecordedReviewsIds != null
                ? lastRecordedReviewsIds.ContainsKey(market)
                    ? lastRecordedReviewsIds[market].MarketReviewId
                    : string.Empty
                : string.Empty;
            var newReviews = reviews.TakeWhile(r => r.MarketReviewId != lastReviewId);
            return newReviews;
        }

        public async Task<IEnumerable<Rating>> FetchAppRating(App app, IEnumerable<Review> appStoreOldReviews, IEnumerable<Review> appStoreNewReviews)
        {
            var result = new List<Rating>();

            var realAppStoreReviews = GetAppStoreReviews(appStoreOldReviews, appStoreNewReviews)?
                .Where(r => r.Market == MarketType.AppStore)
                .ToArray();

            if (!string.IsNullOrEmpty(app.AppStoreId) && realAppStoreReviews?.Length != 0)
            {
                var rating = GetAppStoreRating(app, realAppStoreReviews);
                result.Add(rating);
            }
            if (!string.IsNullOrEmpty(app.AppGalleryId))
            {
                result.Add(await appGallery.GetAppRatingAsync(app).ConfigureAwait(false));
            }
            if (!string.IsNullOrEmpty(app.PlayMarketId))
            {
                result.Add(await playMarket.GetAppRatingAsync(app).ConfigureAwait(false));
            }

            return result.Where(r => r != null);
        }

        private static IEnumerable<Review> GetAppStoreReviews(IEnumerable<Review> appStoreOldReviews, IEnumerable<Review> appStoreNewReviews) =>
            appStoreOldReviews != null
                ? appStoreNewReviews != null
                    ? appStoreOldReviews.Concat(appStoreNewReviews)
                    : appStoreOldReviews
                : appStoreNewReviews;
        

        private static Rating GetAppStoreRating(App app, Review[] appStoreReviews)
        {
            var scores = appStoreReviews
                .GroupBy(r => r.Rating)
                .ToDictionary(g => g.Key, g => g.Count());

            for (var i = 1; i <= 5; ++i)
                if (!scores.ContainsKey(i))
                    scores[i] = 0;

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
    }
}
