using System;

namespace MultimarketStatistics.Models
{
    public class UserContract
    {
        public Guid Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string SlackCredentials { get; set; }
    }
}