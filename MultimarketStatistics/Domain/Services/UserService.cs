using System;
using Storage.Entities;
using Storage.Repositories;

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

        public User[] GetAll()
        {
            return userRepository.GetAll();
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
    }
}