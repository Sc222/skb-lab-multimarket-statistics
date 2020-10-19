using System;
using System.Collections.Generic;
using System.Text;

namespace Storage.Entities
{
    public class Review : GuidIdentifiable
    {
        public virtual App App { get; set; }

        public MarketType Market { get; set; }

        public string Text { get; set; }

        public int Rating { get; set; }

        public string ReviewerUsername { get; set; }

        public string Version { get; set; }

        public DateTime Date { get; set; }

        public string DevResponse { get; set; }
    }
}
