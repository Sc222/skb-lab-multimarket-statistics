using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Storage.Entities;
using Storage.Repositories;

namespace Domain.Services
{
    public class AppService
    {
        private readonly IRepository<App> appRepository;
        private readonly IRepository<Review> reviewRepository;
        private readonly IRepository<Rating> ratingRepository;
        private readonly FetcherService fetcherService;

        public AppService(IRepository<App> appRepository, FetcherService fetcherService,
            IRepository<Review> reviewRepository, IRepository<Rating> ratingRepository)
        {
            this.appRepository = appRepository;
            this.fetcherService = fetcherService;
            this.reviewRepository = reviewRepository;
            this.ratingRepository = ratingRepository;
        }

        public async Task<Guid> Create(App app)
        {
            appRepository.Create(app);

            try
            {
                var reviews = await fetcherService.FetchAppReviews(app).ConfigureAwait(false);
                var rating = await fetcherService.FetchAppRating(app, null, reviews).ConfigureAwait(false);
                reviewRepository.CreateRange(reviews);
                ratingRepository.CreateRange(rating);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return app.Id;
        }

        public App Get(Guid id)
        {
            return appRepository.Get(id);
        }

        public App[] GetAppsByUser(Guid userId)
        {
            return appRepository.Find(a => a.User.Id == userId);
        }

        public App[] GetAll()
        {
            return appRepository.GetAll(true);
        }

        public void Update(App app)
        {
            appRepository.Update(app);
        }

        public void Delete(App app)
        {
            appRepository.Delete(app);
        }
    }
}
