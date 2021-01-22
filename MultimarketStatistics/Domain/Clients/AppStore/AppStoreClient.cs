using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Storage.Entities;

namespace Domain.Clients.AppStore
{
    public class AppStoreClient : IMarketClient
    {
        private const string iTunesApiUrl = "https://itunes.apple.com/ru/rss/customerreviews";
        private const int MaxITunesRssPages = 10;
        private const int ReviewsPerPage = 50;

        public Task<Rating> GetAppRatingAsync(App app)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Review>> GetAppReviewsAsync(App app, int requestedPagesNumber = MaxITunesRssPages)
        {
            using var client = RestClient.GetClient();
            var result = new List<Review>();
            var totalPages = Math.Min(MaxITunesRssPages, requestedPagesNumber);
            for (var pageNum = 1; pageNum <= totalPages; ++pageNum)
                try
                {
                    var locale = "ru"; //позже..
                    var uri = CreateReviewUri(pageNum, app.AppStoreId, locale);
                    var reviewsList = await RestClient.GetFromXmlAsync<AppStoreFeed>(client, uri).ConfigureAwait(false);
                    result.AddRange(ConvertToReviews(reviewsList, app));
                    if (reviewsList.ReviewsList.ReviewsList.Count < ReviewsPerPage)
                        break;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e); //Сделать лог
                }

            return result;
        }

        private string CreateReviewUri(int page, string appId, string locale)
        {
            return iTunesApiUrl + $"/{locale}/rss/customerreviews/page={page}/id={appId}/sortby=mostrecent/xml";
        }

        private IEnumerable<Review> ConvertToReviews(AppStoreFeed reviewsList, App app)
        {
            return reviewsList.ReviewsList.ReviewsList.Select(r => new Review
            {
                App = app,
                Date = r.CreationDate,
                Market = MarketType.AppStore,
                MarketReviewId = r.Id,
                ReviewerUsername = r.Author.Name,
                Rating = r.Rating,
                Text = $"{r.ReviewTitle}\n{r.Content.First().Text}",
                Version = r.Version
            });
        }
    }
}