using System.Linq;
using FluentAssertions;
using MoreLinq;
using NUnit.Framework;
using Storage;
using Storage.Entities;
using Storage.Repositories;

namespace Tests
{
    public class StorageTests
    {
        private void DeleteAllUsers()
        {
            var context = new StorageContext();
            context.Users.ToArray().ForEach(u => context.Users.Remove(u));
            context.SaveChanges();
        }

        [Test]
        public void StorageShould_CreateUser()
        {
            DeleteAllUsers();
            var factory = new ContextFactory();
            var users = new Repository<User>(factory);
            users.Create(new User
            {
                Email = "test@mail.ru",
                Password = "test",
                SlackCredentials = "Slack",
                Username = "test"
            });
            users.GetAll().Length.Should().Be(1);
        }
    }
}