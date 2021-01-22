using System;
using Storage.Entities;

namespace MultimarketStatistics.Models
{
    public class ReviewContract
    {
        public MarketType Market { get; set; }

        public string Text { get; set; }

        public int Rating { get; set; }

        public string ReviewerUsername { get; set; }

        public string Version { get; set; }

        public DateTime Date { get; set; }
    }
}