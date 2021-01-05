using System;
using AutoMapper;
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
        public RatingContract[] GetAppRatings(Guid appId, [FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            var ratings = ratingService.GetRatingsByApp(appId, from, to);
            return mapper.Map<RatingContract[]>(ratings);
        }
    }
}
