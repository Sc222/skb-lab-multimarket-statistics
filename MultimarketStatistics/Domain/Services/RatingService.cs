using System;
using System.Collections.Generic;
using System.Linq;
using Storage.Entities;
using Storage.Repositories;

namespace Domain.Services
{
    public class RatingService
    {
        private readonly IRepository<Rating> ratingRepository;

        public RatingService(IRepository<Rating> ratingRepository)
        {
            this.ratingRepository = ratingRepository;
        }

        public void CreateRange(IEnumerable<Rating> ratings)
        {
            ratingRepository.CreateRange(ratings);
        }

        public Dictionary<Guid, Rating[]> GetAllByApps(IEnumerable<App> apps)
        {
            return ratingRepository.Find(r => apps.Contains(r.App)).GroupBy(r => r.App.Id)
                .ToDictionary(g => g.Key, g => g.ToArray());
        }

        public Rating[] GetRatingsByApp(Guid appId, DateTime from, DateTime to)
        {
            return ratingRepository.Find(r => r.App.Id == appId && r.Date >= from && r.Date <= to);
        }
    }
}