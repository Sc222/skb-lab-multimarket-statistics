using System;
using System.Linq;
using AutoMapper;
using Domain;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MultimarketStatistics.Models;
using Storage.Entities;

namespace MultimarketStatistics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly AppService appService;
        private readonly IMapper mapper;
        private readonly ReviewService reviewService;

        public ReviewController(ReviewService reviewService, IMapper mapper, AppService appService)
        {
            this.reviewService = reviewService;
            this.mapper = mapper;
            this.appService = appService;
        }

        [Authorize]
        [HttpGet("{userId}/{appId}")]
        public ActionResult<SearchResult<ReviewContract[]>> GetAppReviews(Guid userId, Guid appId,
            [FromQuery] int? skip, [FromQuery] int? take,
            [FromQuery] string market, [FromQuery(Name = "version")] string[] versions,
            [FromQuery(Name = "rating")] int[] ratings,
            [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            if (!IsValidAction(userId, appId))
                return StatusCode(StatusCodes.Status403Forbidden);

            if (versions.Contains("notMentioned"))
                versions = versions.Append(null).ToArray();

            var searchResult = reviewService.GetAppReviews(appId, market.ToMarketType());
            var filtered = searchResult.AsEnumerable();

            if (versions.Length != 0)
                filtered = filtered.Where(r => versions.Contains(r.Version));
            if (ratings.Length != 0)
                filtered = filtered.Where(r => ratings.Contains(r.Rating));
            if (from != null)
                filtered = filtered.Where(r => r.Date >= from);
            if (to != null)
                filtered = filtered.Where(r => r.Date <= to);

            var result = filtered as Review[] ?? filtered.ToArray();

            var total = result.Length;

            var requested = result.SkipOrAll(skip).TakeOrAll(take).ToArray();

            return new SearchResult<ReviewContract[]>(total, requested.Length,
                mapper.Map<ReviewContract[]>(requested));
        }

        private bool IsValidAction(Guid userId, Guid appId)
        {
            return UserIdValidator.IsValidAction(HttpContext, userId) && appService.IsOwnedByUser(userId, appId);
        }
    }
}