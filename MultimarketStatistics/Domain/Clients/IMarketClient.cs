using Storage.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain
{
    public interface IMarketClient
    {
        App GetApp(string appId);

        Task<List<Review>> GetAppReviewsAsync(App app);

        Task<Rating> GetAppRatingAsync(App app);
    }
}
