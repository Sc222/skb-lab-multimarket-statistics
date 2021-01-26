using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Storage.Entities
{
    public class Rating : GuidIdentifiable
    {
        [ForeignKey("AppForeignKey")] public virtual App App { get; set; }

        public double AverageRating { get; set; }

        public DateTime Date { get; set; }

        public MarketType Market { get; set; }
    }
}