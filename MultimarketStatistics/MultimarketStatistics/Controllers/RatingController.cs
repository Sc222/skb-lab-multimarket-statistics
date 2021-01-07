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
        private readonly RatingService ratingService;
        private readonly IMapper mapper;

        public RatingController(RatingService ratingService, IMapper mapper)
        {
            this.ratingService = ratingService;
            this.mapper = mapper;
        }

        [HttpGet("{appId}")]
        public RatingContract[] GetAppRatings(Guid appId, [FromQuery] DateTime from, [FromQuery] DateTime to, [FromQuery] string market)
        {
            var ratings = ratingService.GetRatingsByApp(appId, from, to);

            if (market != null)
                ratings = ratings.Where(r => r.Market == market.ToMarketType()).ToArray();

            return mapper.Map<RatingContract[]>(ratings);
        }
    }
}
