using System;
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
            [FromQuery] string market)
        {
            if (!IsValidAction(userId, appId))
                return StatusCode(StatusCodes.Status403Forbidden);

            var searchResult = reviewService.GetAppReviews(appId, skip, take, market.ToMarketType());
            return new SearchResult<ReviewContract[]>(searchResult.Total, searchResult.Found,
                mapper.Map<ReviewContract[]>(searchResult.FoundItem));
        }

        private bool IsValidAction(Guid userId, Guid appId)
        {
            return UserIdValidator.IsValidAction(HttpContext, userId) && appService.IsOwnedByUser(userId, appId);
        }
    }
}