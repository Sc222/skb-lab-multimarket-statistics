using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Storage.Entities
{
    public class Notification : GuidIdentifiable
    {
        [ForeignKey("AppForeignKey")] public virtual App App { get; set; }

        [ForeignKey("UserForeignKey")] public virtual User User { get; set; }

        public string Text { get; set; }

        public bool IsChecked { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }
    }
}