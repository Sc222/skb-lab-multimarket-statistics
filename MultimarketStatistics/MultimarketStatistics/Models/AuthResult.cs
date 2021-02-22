using System;
using System.Collections.Generic;
using System.Text;

namespace MultimarketStatistics.Models
{
    public class AuthResult
    {
        public UserContract User { get; set; }

        public string Token { get; set; }

        public DateTime Expires { get; set; }
    }
}
