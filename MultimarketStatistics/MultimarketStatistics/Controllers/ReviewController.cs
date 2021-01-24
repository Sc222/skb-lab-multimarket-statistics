using System;
using AutoMapper;
using Domain;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using MultimarketStatistics.Models;

namespace MultimarketStatistics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController
    {
        private readonly IMapper mapper;
        private readonly ReviewService reviewService;

        public ReviewController(ReviewService reviewService, IMapper mapper)
        {
            this.reviewService = reviewService;
            this.mapper = mapper;
        }

        //[Authorize]
        [HttpGet("{userId}/{appId}")]
        public ActionResult<SearchResult<ReviewContract[]>> GetAppReviews(Guid userId, Guid appId, [FromQuery] int? skip, [FromQuery] int? take,
            [FromQuery] string market)
        {
            //if (!UserIdValidator.IsValidAction(HttpContext, userId))
            //    return StatusCode(StatusCodes.Status403Forbidden);
            var searchResult = reviewService.GetAppReviews(appId, skip, take, market.ToMarketType());
            return new SearchResult<ReviewContract[]>(searchResult.Total, searchResult.Found,
                mapper.Map<ReviewContract[]>(searchResult.FoundItem));
        }
    }
}