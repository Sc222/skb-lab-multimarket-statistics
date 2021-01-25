using System;

namespace MultimarketStatistics.Models
{
    public class NotificationContract
    {
        public string Text { get; set; }

        public bool IsChecked { get; set; }

        public string Title { get; set; }

        public Guid AppId { get; set; }

        public Guid Id { get; set; }

        public DateTime Date { get; set; }
    }
}