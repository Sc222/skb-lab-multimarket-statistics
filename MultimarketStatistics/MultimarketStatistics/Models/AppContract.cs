using System;
using System.Collections.Generic;
using System.Text;

namespace MultimarketStatistics.Models
{
    public class AppContract
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string AppGalleryId { get; set; } //null, если нет маркета

        public string AppStoreId { get; set; }

        public string PlayMarketId { get; set; }

        public string Description { get; set; }

        public string PicUrl { get; set; }
    }
}
