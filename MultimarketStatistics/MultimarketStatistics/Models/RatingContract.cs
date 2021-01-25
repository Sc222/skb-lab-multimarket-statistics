using System;
using Storage.Entities;

namespace MultimarketStatistics.Models
{
    public class RatingContract
    {
        public double AppStoreRating { get; set; }

        public double PlayMarketRating { get; set; }

        public double AppGalleryRating { get; set; }

        public DateTime Date { get; set; }

    }
}