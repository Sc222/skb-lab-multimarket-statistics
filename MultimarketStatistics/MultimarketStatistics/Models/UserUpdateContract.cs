using System;
using System.Collections.Generic;
using System.Text;

namespace MultimarketStatistics.Models
{
    public class UserUpdateContract : UserContract
    {
        public string CurrentPassword { get; set; }

        public string NewEmail { get; set; }

        public string NewUsername { get; set; }
    }
}
