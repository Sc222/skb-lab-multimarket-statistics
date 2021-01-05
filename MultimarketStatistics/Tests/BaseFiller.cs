using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Storage;
using Storage.Entities;
using Storage.Repositories;

namespace Tests
{
    public class BaseFiller
    {
        [Test]
        public void ClearBase()
        {
            var context = new StorageContext();
            context.Database.ExecuteSqlRaw("DROP SCHEMA public CASCADE");
            context.Database.ExecuteSqlRaw("CREATE SCHEMA public");
            context.Database.Migrate();
        }

        [Test]
        public void FillBase()
        {
            var contextFactory = new ContextFactory();
            var userRepository = new Repository<User>(contextFactory);
            var appRepository = new Repository<App>(contextFactory);

            //playMarket, appStore, appGallery
            var vkCreds = new AppCreds("com.vkontakte.android", "564177498", "C101104117");
            var igCreds = new AppCreds("com.instagram.android", "389801252", null);
            var tinderCreds = new AppCreds("com.tinder", "547702041", "C101456235");
             
            var skbBankCreds = new AppCreds("ru.skbbank.ib", "1440976872", "C102672675");
            var deloBankCreds = new AppCreds("ru.skblab.skbbank", "1259088609", "C102683819");
            //var rybalkaCreds

            var bigAppsUser = new User
            {
                Email = "test@email.com",
                Username = "bigUser",
                Password = "test",
                SlackCredentials = "someSlackCreds"
            };
            var smallAppsUser = new User
            {
                Email = "test1@email.com",
                Username = "smallUser",
                Password = "test",
                SlackCredentials = "someSlackCreds1"
            };
            var vk = CreateApp(bigAppsUser, "VK", vkCreds);
            var ig = CreateApp(bigAppsUser, "Instagram", igCreds);
            var tinder = CreateApp(bigAppsUser, "Tinder", tinderCreds);
            var deloBank = CreateApp(smallAppsUser, "Delobank", deloBankCreds);
            var skbBank = CreateApp(smallAppsUser, "SKB Bank", skbBankCreds);
            
            userRepository.Create(bigAppsUser);
            userRepository.Create(smallAppsUser);

            appRepository.Create(vk);
            appRepository.Create(ig);
            appRepository.Create(tinder);
            appRepository.Create(deloBank);
            appRepository.Create(skbBank);
        }

        private class AppCreds
        {
            public readonly string PlayMarketCreds;
            public readonly string AppStoreCreds;
            public readonly string AppGalleryCreds;

            public AppCreds(string playMarketCreds, string appStoreCreds, string appGalleryCreds)
            {
                PlayMarketCreds = playMarketCreds;
                AppStoreCreds = appStoreCreds;
                AppGalleryCreds = appGalleryCreds;
            }
        }

        private App CreateApp(User user, string name, AppCreds creds)
        {
            return new App
            {
                User = user,
                Name = name,
                Description = "some description",
                PlayMarketId = creds.PlayMarketCreds,
                AppStoreId = creds.AppStoreCreds,
                AppGalleryId = creds.AppGalleryCreds
            };
        }
    }
}
