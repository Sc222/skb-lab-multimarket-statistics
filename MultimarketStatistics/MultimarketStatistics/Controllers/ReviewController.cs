using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using AutoMapper;
using Domain;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using MultimarketStatistics.Models;
using Storage.Entities;

namespace MultimarketStatistics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController
    {
        private readonly ReviewService reviewService;
        private readonly IMapper mapper;

        public ReviewController(ReviewService reviewService, IMapper mapper)
        {
            this.reviewService = reviewService;
            this.mapper = mapper;
        }

        [HttpGet("{appId}")]
        public SearchResult<ReviewContract[]> GetAppReviews(Guid appId, [FromQuery] int? skip, [FromQuery] int? take, [FromQuery] string market)
        {
            var searchResult = reviewService.GetAppReviews(appId, skip, take, market.ToMarketType());
            return new SearchResult<ReviewContract[]>(searchResult.Total, searchResult.Found, mapper.Map<ReviewContract[]>(searchResult.FoundItem));
        }
    }
}
