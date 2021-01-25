using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Domain;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using MoreLinq;
using MultimarketStatistics.Models;
using Storage.Entities;

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
        public ActionResult<List<RatingContract>> GetAppRatings(Guid userId, Guid appId, [FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            //if (!UserIdValidator.IsValidAction(HttpContext, userId))
            //    return StatusCode(StatusCodes.Status403Forbidden);
            var ratings = ratingService.GetRatingsByApp(appId, from, to);
            var byDateByMarket = ratings
                .GroupBy(r => r.Date.Date + TimeSpan.FromHours(r.Date.Hour))
                .ToDictionary(g => g.Key, g => g
                    .GroupBy(k => k.Market)
                    .ToDictionary(k => k.Key, k => CountAverage(k
                        .Select(CountAverage)
                        .ToArray())));
            var result = new List<RatingContract>();

            foreach (var byMarket in byDateByMarket)
            {
                var rating = new RatingContract
                {
                    Date = byMarket.Key,
                    AppStoreRating = byMarket.Value.ContainsKey(MarketType.AppStore)
                        ? byMarket.Value[MarketType.AppStore]
                        : 0,
                    PlayMarketRating = byMarket.Value.ContainsKey(MarketType.PlayMarket)
                        ? byMarket.Value[MarketType.PlayMarket]
                        : 0,
                    AppGalleryRating = byMarket.Value.ContainsKey(MarketType.AppGallery)
                        ? byMarket.Value[MarketType.AppGallery]
                        : 0
                };
                result.Add(rating);
            }

            return result;
        }

        private double CountAverage(Rating rating) =>
            (double)(rating.FiveStarsCount * 5  +
             rating.FourStarsCount * 4 +
             rating.ThreeStarsCount * 3 +
             rating.TwoStarsCount * 2 +
             rating.OneStarsCount) / rating.Total;

        private double CountAverage(double[] averages) => averages.Sum() / averages.Length;


    }
}