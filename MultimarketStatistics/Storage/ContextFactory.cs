using System;
using System.Collections.Generic;
using System.Text;

namespace Storage
{
    public class ContextFactory
    {
        public StorageContext Create()
        {
            return new StorageContext();
        }
    }
}
