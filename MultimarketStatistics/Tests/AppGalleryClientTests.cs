using System;
using System.Collections.Generic;
using System.Text;
using Domain;
using Domain.Clients;
using Domain.Clients.AppGallery;
using NUnit.Framework;
using Domain.Clients.AppStore;
using Domain.Clients.PlayMarket;
using Storage.Entities;

namespace Tests
{
    [TestFixture]
    public class AppGalleryClientTests
    {
        [Test]
        public void AppStoreRequestTest()
        {
            var client = RestClient.GetClient();
            var uri = "https://itunes.apple.com/ru/rss/customerreviews/id=389801252/sortBy=mostRecent/xml";
            var a = RestClient.GetFromXmlAsync<AppStoreFeed>(client, uri).Result;
        }

        [Test]
        public void AppGalleryRequestTest()
        {
            var client = RestClient.GetClient();

            var uri = "https://web-drru.hispace.dbankcloud.cn/uowap/index?method=internal.user.commenList3&reqPageNum=1&maxResults=25&appid=C101104117";
            var a = RestClient.GetAsync<AppGalleryReviewList>(client, uri).Result;
        }

        [Test]
        public void PlayMarketRequestTest()
        {
            var client = RestClient.GetClient();

            var uri = "http://localhost:3000/api/playMarket/apps/com.vkontakte.android/reviews?page=1";
            var a = RestClient.GetAsync<PlayMarketResult>(client, uri).Result;
        }

        [Test]
        public void PlayMarketClientTest()
        {
            var client = RestClient.GetClient();

            var app = new App() {PlayMarketId = "com.vkontakte.android"};

            var appClient = new PlayMarketClient();
            var reviews = appClient.GetAppReviewsAsync(app, 2).Result;
            var rating = appClient.GetAppRatingAsync(app).Result;
        }

        [Test]
        public void AppStoreClientTest()
        {
            var client = RestClient.GetClient();

            var app = new App() { AppStoreId = "564177498" };
            var config = new Config{ITunesApiUrl = "https://itunes.apple.com/ru/rss/customerreviews"};
            var appClient = new AppStoreClient();
            var reviews = appClient.GetAppReviewsAsync(app, 2).Result;
        }

        [Test]
        public void AppGalleryClientTest()
        {
            var client = RestClient.GetClient();

            var app = new App() { AppGalleryId = "C101104117" };
            var config = new Config { AppGalleryApiUrl = "https://web-drru.hispace.dbankcloud.cn/uowap/index?method=internal.user.commenList3" };
            var appClient = new AppGalleryClient();
            var reviews = appClient.GetAppReviewsAsync(app, 2).Result;
            var rating = appClient.GetAppRatingAsync(app).Result;
        }
    }
}
