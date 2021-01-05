using System;
using System.Collections.Generic;
using System.Text;
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

        public Rating[] GetRatingsByApp(Guid appId, DateTime from, DateTime to)
        {
            return ratingRepository.Find(r => r.App.Id == appId && r.Date >= from && r.Date <= to);
        }
    }
}
