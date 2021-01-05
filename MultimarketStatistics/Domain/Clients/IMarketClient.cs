using Storage.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain
{
    public interface IMarketClient
    {
        Task<List<Review>> GetAppReviewsAsync(App app, int requestedPagesNumber);

        Task<Rating> GetAppRatingAsync(App app);
    }
}
