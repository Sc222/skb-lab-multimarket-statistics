using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Clients.AppGallery;
using Domain.Clients.AppStore;
using Domain.Clients.PlayMarket;
using MoreLinq;
using Storage.Entities;
using Version = Storage.Entities.Version;

namespace Domain.Services
{
    public class FetcherService
    {
        private readonly AppGalleryClient appGallery;
        private readonly AppStoreClient appStore;
        private readonly PlayMarketClient playMarket;

        public FetcherService(AppStoreClient appStore, PlayMarketClient playMarket, AppGalleryClient appGallery)
        {
            this.appStore = appStore;
            this.playMarket = playMarket;
            this.appGallery = appGallery;
        }

        public async Task<List<Review>> FetchAppReviews(App app,
            Dictionary<MarketType, Review> lastRecordedReviewsIds = null)
        {
            var result = new List<Review>();

            if (!string.IsNullOrEmpty(app.AppStoreId))
                result.AddRange(await GetReviews(app, lastRecordedReviewsIds, appStore, MarketType.AppStore)
                    .ConfigureAwait(false));

            if (!string.IsNullOrEmpty(app.AppGalleryId))
                result.AddRange(await GetReviews(app, lastRecordedReviewsIds, appGallery, MarketType.AppGallery)
                    .ConfigureAwait(false));

            if (!string.IsNullOrEmpty(app.PlayMarketId))
                result.AddRange(await GetReviews(app, lastRecordedReviewsIds, playMarket, MarketType.PlayMarket)
                    .ConfigureAwait(false));

            return result;
        }

        private async Task<IEnumerable<Review>> GetReviews(App app,
            Dictionary<MarketType, Review> lastRecordedReviewsIds,
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

        public async Task<IEnumerable<Rating>> FetchAppRating(App app)
        {
            var result = new List<Rating>();

            if (!string.IsNullOrEmpty(app.AppStoreId))
                result.Add(await appStore.GetAppRatingAsync(app).ConfigureAwait(false));

            if (!string.IsNullOrEmpty(app.AppGalleryId))
                result.Add(await appGallery.GetAppRatingAsync(app).ConfigureAwait(false));

            if (!string.IsNullOrEmpty(app.PlayMarketId))
                result.Add(await playMarket.GetAppRatingAsync(app).ConfigureAwait(false));

            return result.Where(r => r != null);
        }

        public async Task<string> FetchAppPicUrl(App app)
        {
            var picUrl = await appStore.GetAppPicUrl(app).ConfigureAwait(false);
            if (picUrl != null)
                return picUrl;

            picUrl = await playMarket.GetAppPicUrl(app).ConfigureAwait(false);
            if (picUrl != null)
                return picUrl;

            return await appStore.GetAppPicUrl(app).ConfigureAwait(false);
        }

        public List<Version> GetVersionsFromReviews(List<Review> reviews)
        {
            return reviews.Select(r => new Version
                {
                    AppId = r.App.Id,
                    Number = string.IsNullOrEmpty(r.Version) ? null : r.Version,
                    Market = r.Market
                })
                .DistinctBy(v => new  {v.Number, v.Market})
                .ToList();
        }
    }
}