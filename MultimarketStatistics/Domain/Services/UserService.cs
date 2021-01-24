﻿using System;
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

        public UserService(IRepository<User> userRepository)
        {
            this.userRepository = userRepository;
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

        public UserCheckResult CheckForUniqueness(string email, string username, string slackCreds)
        {
            var same = userRepository.Find(u => u.Email == email || u.Username == username || u.SlackCredentials == slackCreds);

            return new UserCheckResult
            {
                IsEmailUnique = same.Any(u => u.Email == email),
                IsUsernameUnique = same.Any(u => u.Username == username),
                IsSlackCredentialsUnique = same.Any(u => u.SlackCredentials == slackCreds)
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

        public void Delete(User user)
        {
            userRepository.Delete(user);
        }

        public (User, string)? Authenticate(User model)
        {
            var user = userRepository.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

            if (user == null) 
                return null;

            var token = GenerateJwtToken(user);

            return (user, token);
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("absolutelysecretkey)))");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}