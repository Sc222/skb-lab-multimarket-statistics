using System;
using System.Collections.Generic;
using System.Text;
using Storage.Entities;

namespace MultimarketStatistics.Models
{
    public class RatingContract
    {
        public int Total { get; set; }

        public int FiveStarsCount { get; set; }

        public int FourStarsCount { get; set; }

        public int ThreeStarsCount { get; set; }

        public int TwoStarsCount { get; set; }

        public int OneStarsCount { get; set; }

        public DateTime Date { get; set; }

        public MarketType Market { get; set; }
    }
}
