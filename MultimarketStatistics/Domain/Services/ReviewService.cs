using System;
using System.Collections.Generic;
using System.Linq;
using Storage.Entities;
using Storage.Repositories;

namespace Domain.Services
{
    public class ReviewService
    {
        private readonly IRepository<Review> reviewRepository;

        public ReviewService(IRepository<Review> reviewRepository)
        {
            this.reviewRepository = reviewRepository;
        }

        public Dictionary<App, Review[]> GetAllByApps(IEnumerable<App> apps)
        {
            return reviewRepository.Find(r => apps.Contains(r.App)).GroupBy(r => r.App).ToDictionary(g => g.Key, g => g.ToArray());
        }

        public void CreateRange(IEnumerable<Review> reviews)
        {
            reviewRepository.CreateRange(reviews);
        }

        public SearchResult<Review[]> GetAppReviews(Guid appId, int? skip, int? take, MarketType market)
        {
            var appReviews = reviewRepository.Find(r => r.App.Id == appId && r.Market == market);
            var requested = appReviews.OrderByDescending(r => r.Date).SkipOrAll(skip).TakeOrAll(take).ToArray();
            return new SearchResult<Review[]>(appReviews.Length, requested.Length, requested);
        }
    }
}
