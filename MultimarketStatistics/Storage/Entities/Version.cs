using System;
using System.Collections.Generic;
using System.Text;

namespace Storage.Entities
{
    public class Version: GuidIdentifiable
    {
        public string Number { get; set; }

        public Guid AppId { get; set; }

        public MarketType Market { get; set; }
    }
}
