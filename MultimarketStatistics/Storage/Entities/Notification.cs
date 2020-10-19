using System;
using System.Collections.Generic;
using System.Text;

namespace Storage.Entities
{
    public class Notification : GuidIdentifiable
    {
        public virtual User User { get; set; }

        public virtual App App { get; set; }

        public string Text { get; set; }

        public bool IsChecked { get; set; }

        public string Title { get; set; }
    }
}
