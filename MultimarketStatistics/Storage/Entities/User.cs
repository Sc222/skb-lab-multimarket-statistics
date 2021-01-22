namespace Storage.Entities
{
    public class User : GuidIdentifiable
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string SlackCredentials { get; set; }
    }
}