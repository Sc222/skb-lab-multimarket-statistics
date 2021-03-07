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

        public Dictionary<Guid, Review[]> GetAllByApps(IEnumerable<App> apps)
        {
            return reviewRepository.Find(r => apps.Contains(r.App)).GroupBy(r => r.App.Id)
                .ToDictionary(g => g.Key, g => g.ToArray());
        }

        public void CreateRange(IEnumerable<Review> reviews)
        {
            reviewRepository.CreateRange(reviews);
        }

        public Review[] GetAppReviews(Guid appId, MarketType market)
        {
            return reviewRepository.Find(r => r.App.Id == appId && r.Market == market);
        }
    }
}