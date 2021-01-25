using System.Collections.Generic;
using System.Threading.Tasks;
using Storage.Entities;

namespace Domain
{
    public interface IMarketClient
    {
        Task<List<Review>> GetAppReviewsAsync(App app, int requestedPagesNumber);

        Task<Rating> GetAppRatingAsync(App app);

        Task<string> GetAppPicUrl(App app);
    }
}