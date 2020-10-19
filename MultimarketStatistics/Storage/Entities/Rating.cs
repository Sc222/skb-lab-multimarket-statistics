using System;
using System.Collections.Generic;
using System.Text;

namespace Storage.Entities
{
    public class Rating : GuidIdentifiable
    {
        public virtual App App { get; set; }

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
