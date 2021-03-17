using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Storage.Entities;

namespace Domain.Clients.PlayMarket
{
    public class PlayMarketClient : IMarketClient
    {
        private const string apiUrl = "http://market-api:3001/api/playMarket/apps/";
        private const int maxPages = 4;
        private const int ReviewsPerPage = 150;

        public async Task<List<Review>>
            GetAppReviewsAsync(App app,
                int requestedPagesNumber = maxPages) // пусть пока будет 10 (надо поменять!!!)...
        {
            using var client = RestClient.GetClient();
            var result = new List<Review>();
            string pageToken = null;
            var totalPages = Math.Min(maxPages, requestedPagesNumber);
            for (var pageNum = 1; pageNum <= totalPages; ++pageNum)
                try
                {
                    var apiResult = await GetApiResult(client, app, pageToken).ConfigureAwait(false);
                    result.AddRange(ConvertToReviews(app, apiResult));
                    pageToken = apiResult.PaginationToken;
                    if (apiResult.Reviews.Count < ReviewsPerPage)
                        break;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e); //Сделать лог
                }

            return result;
        }

        public async Task<Rating> GetAppRatingAsync(App app)
        {
            try
            {
                using var client = RestClient.GetClient();
                var uri = CreateAppInfoUri(app.PlayMarketId);
                var ratings = await RestClient.GetAsync<PlayMarketApp>(client, uri).ConfigureAwait(false);
                return ConvertToRating(ratings, app);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        private Task<PlayMarketResult> GetApiResult(HttpClient client, App app, string pageToken)
        {
            var locale = "ru"; //позже..
            var uri = CreateReviewUri(app.PlayMarketId, locale, pageToken);
            return RestClient.GetAsync<PlayMarketResult>(client, uri);
        }

        private string CreateReviewUri(string appId, string locale, string pageToken = null)
        {
            return apiUrl +
                   $"{appId}/reviews?lang={locale}&paginate=true&{(pageToken == null ? "" : "nextPaginationToken=" + pageToken)}";
        }

        private IEnumerable<Review> ConvertToReviews(App app, PlayMarketResult playMarketResult)
        {
            return playMarketResult.Reviews.Select(r => new Review
            {
                App = app,
                Date = r.Date,
                Market = MarketType.PlayMarket,
                MarketReviewId = r.Id,
                Rating = r.Score,
                Text = r.Text,
                Version = r.Version,
                ReviewerUsername = r.Username
            });
        }

        private string CreateAppInfoUri(string appId)
        {
            return apiUrl + appId;
        }

        private Rating ConvertToRating(PlayMarketApp ratings, App app)
        {
            var rating = ratings.Rating;
            return new Rating
            {
                App = app,
                Date = DateTime.Now,
                Market = MarketType.PlayMarket,
                AverageRating = CountAverage(rating, ratings.Total)
            };
        }

        private double CountAverage(PlayMarketRating ratings, int total) =>
            (double)(ratings.FiveStars * 5 +
                     ratings.FourStars * 4 +
                     ratings.ThreeStars * 3 +
                     ratings.TwoStars * 2 +
                     ratings.OneStars) / total;

        public async Task<string> GetAppPicUrl(App app)
        {
            using var client = RestClient.GetClient();
            try
            {
                var requestUri = CreateAppInfoUri(app.PlayMarketId);
                var appInfo = await RestClient.GetAsync<PlayMarketApp>(client, requestUri).ConfigureAwait(false);
                return appInfo.IconUrl;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}