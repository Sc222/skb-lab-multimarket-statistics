using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace Storage.Entities
{
    public class App : GuidIdentifiable
    {
        public string Name { get; set; }

        public string AppGalleryId { get; set; }

        public string AppStoreId { get; set; }

        public string PlayMarketId { get; set; }

        public virtual User User { get; set; }

        public string Description { get; set; }

        public string PicUrl { get; set; }
    }
}
