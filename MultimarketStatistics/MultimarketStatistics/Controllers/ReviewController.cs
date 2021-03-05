using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Domain;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MultimarketStatistics.Models;

namespace MultimarketStatistics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ReviewService reviewService;
        private readonly AppService appService;

        public ReviewController(ReviewService reviewService, IMapper mapper, AppService appService)
        {
            this.reviewService = reviewService;
            this.mapper = mapper;
            this.appService = appService;
        }

        [Authorize]
        [HttpGet("{userId}/{appId}")]
        public ActionResult<SearchResult<ReviewContract[]>> GetAppReviews(Guid userId, Guid appId, [FromQuery] int? skip, [FromQuery] int? take,
            [FromQuery] string market, [FromQuery(Name = "version")] string[] versions, [FromQuery(Name = "rating")] int[] ratings,
            [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            if (!IsValidAction(userId, appId))
                return StatusCode(StatusCodes.Status403Forbidden);

            if (versions.Contains("notMentioned"))
                versions = versions.Append(null).ToArray();

            var searchResult = reviewService.GetAppReviews(appId, skip, take, market.ToMarketType());
            var result = searchResult.FoundItem.AsEnumerable();

            if (versions.Length != 0)
                result = result.Where(r => versions.Contains(r.Version));
            if (ratings.Length != 0)
                result = result.Where(r => ratings.Contains(r.Rating));
            if (from != null)
                result = result.Where(r => r.Date >= from);
            if (to != null)
                result = result.Where(r => r.Date <= to);

            return new SearchResult<ReviewContract[]>(searchResult.Total, result.Count(),
                mapper.Map<ReviewContract[]>(result));
        }

        private bool IsValidAction(Guid userId, Guid appId)
        {
            return UserIdValidator.IsValidAction(HttpContext, userId) && appService.IsOwnedByUser(userId, appId);
        }
    }
}