using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using Domain.Clients.AppGallery;
using Storage.Entities;

namespace Domain.Clients
{
    public class AppGalleryClient : IMarketClient
    {
        private readonly string apiUrl;
        private const int MaxReviewPages = 4;

        public AppGalleryClient(Config config)
        {
            apiUrl = config.AppGalleryApiUrl;
        }

        public App GetApp(string appId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Review>> GetAppReviewsAsync(App app)
        {
            var client = RestClient.GetClient();
            var result = new List<Review>();
            for (var pageNum = 1; pageNum <= MaxReviewPages; ++pageNum)
                try
                {
                    var uri = CreateReviewUri(pageNum, app.AppGalleryId);
                    var reviewsList = await RestClient.GetAsync<AppGalleryReviewList>(client, uri);
                    result.AddRange(ConvertToReview(reviewsList, app));
                }
                catch (Exception e)
                {
                    Console.WriteLine(e); //Сделать лог
                }

            return result;
        }

        private string CreateReviewUri(int page, string appId) =>
            apiUrl + $"&reqPageNum={page}&maxResults=25&appid={appId}";

        //Вынести в отдельный класс??
        private IEnumerable<Review> ConvertToReview(AppGalleryReviewList reviews, App app)
        {
            return reviews.ReviewsList.Select(r => new Review
            {
                App = app,
                Date = r.Date,
                DevResponse = r.DevResponse,
                Market = MarketType.AppGallery,
                Rating = r.Rating,
                ReviewerUsername = r.ReviewerUsername,
                Text = r.Text,
                Version = r.Version
            });
        }

        public async Task<Rating> GetAppRatingAsync(App app)
        {
            var client = RestClient.GetClient();
            try
            {
                var uri = apiUrl + $"&appid={app.AppGalleryId}";
                var ratingsList = await RestClient.GetAsync<AppGalleryRatingList>(client, uri);
                return ConvertToRating(ratingsList, app);
            }
            catch (Exception e)
            {
                throw e; // тоже в лог
            }
        }

        private Rating ConvertToRating(AppGalleryRatingList ratingsList, App app)
        {
            var ratings = ratingsList.RatingsList;
            return new Rating
            {
                App = app,
                Date = DateTime.Now,
                OneStarsCount = ratings[0].RatingCounts,
                TwoStarsCount = ratings[1].RatingCounts,
                ThreeStarsCount = ratings[2].RatingCounts,
                FourStarsCount = ratings[3].RatingCounts,
                FiveStarsCount = ratings[4].RatingCounts,
                Total = ratings.Sum(r => r.RatingCounts),
                Market = MarketType.AppGallery
            };
        }
    }
}
