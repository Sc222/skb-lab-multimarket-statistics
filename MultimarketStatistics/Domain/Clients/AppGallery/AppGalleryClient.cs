﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Storage.Entities;

namespace Domain.Clients.AppGallery
{
    public class AppGalleryClient : IMarketClient
    {
        private const string apiUrl =
            "https://web-drru.hispace.dbankcloud.cn/uowap/index?method=internal.user.commenList3";

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
                var uri = apiUrl + $"&appid={app.AppGalleryId}&page=1";
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
            return apiUrl + $"&reqPageNum={page}&maxResults=25&appid={appId}";
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