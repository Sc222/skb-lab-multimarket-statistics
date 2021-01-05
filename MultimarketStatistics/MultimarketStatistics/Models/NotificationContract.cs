using System;
using System.Collections.Generic;
using System.Text;

namespace MultimarketStatistics.Models
{
    public class NotificationContract
    {
        public string Text { get; set; }

        public bool IsChecked { get; set; }

        public string Title { get; set; }

        public Guid AppId { get; set; }
    }
}
