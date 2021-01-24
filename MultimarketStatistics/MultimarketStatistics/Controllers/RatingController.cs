using System;
using System.Linq;
using AutoMapper;
using Domain;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using MultimarketStatistics.Models;

namespace MultimarketStatistics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController
    {
        private readonly IMapper mapper;
        private readonly RatingService ratingService;

        public RatingController(RatingService ratingService, IMapper mapper)
        {
            this.ratingService = ratingService;
            this.mapper = mapper;
        }

        //[Authorize]
        [HttpGet("{userId}/{appId}")]
        public ActionResult<RatingContract[]> GetAppRatings(Guid userId, Guid appId, [FromQuery] DateTime from, [FromQuery] DateTime to,
            [FromQuery] string market)
        {
            //if (!UserIdValidator.IsValidAction(HttpContext, userId))
            //    return StatusCode(StatusCodes.Status403Forbidden);
            var ratings = ratingService.GetRatingsByApp(appId, from, to);

            if (market != null)
                ratings = ratings.Where(r => r.Market == market.ToMarketType()).ToArray();

            return mapper.Map<RatingContract[]>(ratings);
        }
    }
}