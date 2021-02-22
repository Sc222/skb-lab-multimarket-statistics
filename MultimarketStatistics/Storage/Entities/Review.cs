using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Storage.Entities
{
    public class Review : GuidIdentifiable
    {
        [ForeignKey("AppForeignKey")] public virtual App App { get; set; }

        public MarketType Market { get; set; }

        public string MarketReviewId { get; set; }

        public string Text { get; set; }

        public int Rating { get; set; }

        public string ReviewerUsername { get; set; }

        public string Version { get; set; }

        public DateTime Date { get; set; }

        public string DevResponse { get; set; }

        public bool IsChecked { get; set; }
    }
}