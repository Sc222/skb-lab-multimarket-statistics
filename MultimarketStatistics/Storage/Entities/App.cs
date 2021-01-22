using System.ComponentModel.DataAnnotations.Schema;

namespace Storage.Entities
{
    public class App : GuidIdentifiable
    {
        public string Name { get; set; }

        public string AppGalleryId { get; set; }

        public string AppStoreId { get; set; }

        public string PlayMarketId { get; set; }

        [ForeignKey("UserForeignKey")] public virtual User User { get; set; }

        public string Description { get; set; }

        public string PicUrl { get; set; }
    }
}