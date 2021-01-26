using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Storage.Entities;

namespace Domain.Clients.AppGallery
{
    public class AppGalleryClient : IMarketClient
    {
        private const string reviewApiUrl =
            "https://web-drru.hispace.dbankcloud.cn/uowap/index?method=internal.user.commenList3";

        private const string appInfoApiUrl =
            "https://web-drru.hispace.dbankcloud.cn/uowap/index?method=internal.getTabDetail";

        private const int MaxReviewPages = 4;
        private const int ReviewsPerPage = 25;

        public async Task<List<Review>> GetAppReviewsAsync(App app, int requestedPagesNumber = MaxReviewPages)
        {
            using var client = RestClient.GetClient();
            var result = new List<Review>();
            var totalPages = Math.Min(MaxReviewPages, requestedPagesNumber);
            for (var pageNum = 1; pageNum <= totalPages; ++pageNum)
                try
                {
                    var uri = CreateReviewUri(pageNum, app.AppGalleryId);
                    var reviewsList =
                        await RestClient.GetAsync<AppGalleryReviewList>(client, uri).ConfigureAwait(false);
                    result.AddRange(ConvertToReviews(reviewsList, app));
                    if (reviewsList.ReviewsList.Count < ReviewsPerPage)
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
            using var client = RestClient.GetClient();
            try
            {
                var uri = reviewApiUrl + $"&appid={app.AppGalleryId}&page=1";
                var ratingsList = await RestClient.GetAsync<AppGalleryRatingList>(client, uri).ConfigureAwait(false);
                return ConvertToRating(ratingsList, app);
            }
            catch (Exception e)
            {
                Console.WriteLine(e); // тоже в лог
                return null;
            }
        }

        private string CreateReviewUri(int page, string appId)
        {
            return reviewApiUrl + $"&reqPageNum={page}&maxResults=25&appid={appId}";
        }

        //Вынести в отдельный класс??
        private IEnumerable<Review> ConvertToReviews(AppGalleryReviewList reviews, App app)
        {
            return reviews.ReviewsList.Select(r => new Review
            {
                App = app,
                Date = r.Date,
                DevResponse = r.DevResponse,
                Market = MarketType.AppGallery,
                MarketReviewId = r.Id,
                Rating = r.Rating,
                ReviewerUsername = r.ReviewerUsername,
                Text = r.Text,
                Version = r.Version
            });
        }

        private Rating ConvertToRating(AppGalleryRatingList ratingsList, App app)
        {
            var ratings = ratingsList.RatingsList;
            return new Rating
            {
                App = app,
                Date = DateTime.Now,
                AverageRating = CountAverage(ratings, ratings.Sum(r => r.RatingCounts)),
                Market = MarketType.AppGallery
            };
        }

        private double CountAverage(List<AppGalleryRating> ratings, int total) =>
            (double)(ratings[4].RatingCounts * 5 +
                     ratings[3].RatingCounts * 4 +
                     ratings[2].RatingCounts * 3 +
                     ratings[1].RatingCounts * 2 +
                     ratings[0].RatingCounts) / total;

        public async Task<string> GetAppPicUrl(App app)
        {
            using var client = RestClient.GetClient();
            try
            {
                var uri = GetAppInfoRequestUri(app.AppGalleryId);
                var appInfo = await RestClient.GetAsync<Root>(client, uri).ConfigureAwait(false);
                return appInfo.LayoutData.First().DataList.First().Icon ?? appInfo.LayoutData.First().DataList.First().IcoUri;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        private string GetAppInfoRequestUri(string appId) =>
            appInfoApiUrl + $"&uri=app|{appId}";
    }
}