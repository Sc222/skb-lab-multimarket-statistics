using System;
using System.Threading.Tasks;
using Storage.Entities;
using Storage.Repositories;

namespace Domain.Services
{
    public class AppService
    {
        private readonly IRepository<App> appRepository;
        private readonly FetcherService fetcherService;
        private readonly IRepository<Rating> ratingRepository;
        private readonly IRepository<Review> reviewRepository;

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
            if (string.IsNullOrEmpty(app.PicUrl))
            {
                var picUrl = await fetcherService.FetchAppPicUrl(app).ConfigureAwait(false);
                app.PicUrl = picUrl;
            }

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

        public async Task Update(App app)
        {
            var dbApp = appRepository.Get(app.Id);
            if (app.PicUrl != dbApp.PicUrl)
            {
                var picUrl = await fetcherService.FetchAppPicUrl(app).ConfigureAwait(false);
                app.PicUrl = picUrl;
            }

            appRepository.Update(app);
        }

        public void Delete(App app)
        {
            appRepository.Delete(app);
        }
    }
}