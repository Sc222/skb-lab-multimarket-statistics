using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Services
{
    public class UserCheckResult
    {
        public bool IsEmailUnique { get; set; }

        public bool IsUsernameUnique { get; set; }
    }
}
