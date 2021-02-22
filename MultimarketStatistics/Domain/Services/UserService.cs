using System;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Storage.Entities;
using Storage.Repositories;
using System.Linq;

namespace Domain.Services
{
    public class UserService
    {
        private readonly IRepository<User> userRepository;
        private readonly AppService appService;
        private readonly TimeSpan expirationTime = TimeSpan.FromHours(4);

        public UserService(IRepository<User> userRepository, AppService appService)
        {
            this.userRepository = userRepository;
            this.appService = appService;
        }

        public Guid Create(User user)
        {
            userRepository.Create(user);
            return user.Id;
        }

        public User Get(Guid id)
        {
            return userRepository.Get(id);
        }

        public UserCheckResult CheckForUniqueness(string email, string username)
        {
            var same = userRepository.Find(u => u.Email == email || u.Username == username);

            return new UserCheckResult
            {
                IsEmailUnique = !same.Any(u => u.Email == email),
                IsUsernameUnique = !same.Any(u => u.Username == username)
            };
        }

        public User[] GetAllWithSlackCredentials()
        {
            return userRepository.Find(u => !string.IsNullOrEmpty(u.SlackCredentials));
        }

        public void Update(User user)
        {
            userRepository.Update(user);
        }

        public void Delete(Guid userId)
        {
            var apps = appService.GetAppsByUser(userId);
            appService.DeleteRange(apps);
            userRepository.Delete(userId);
        }

        public (User User, string Token, DateTime Expires)? Authenticate(string username, string password)
        {
            var user = userRepository.SingleOrDefault(x => x.Username == username && x.Password == password);

            if (user == null) 
                return null;

            var token = GenerateJwtToken(user);

            return (user, token.Item1, token.Item2);
        }

        private (string, DateTime) GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("absolutelysecretkey)))");
            var expires = DateTime.UtcNow + expirationTime;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow + expirationTime,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return (tokenHandler.WriteToken(token), expires);
        }
    }
}