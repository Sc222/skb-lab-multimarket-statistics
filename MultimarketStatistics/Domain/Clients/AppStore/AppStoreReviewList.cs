using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Domain.Clients.AppStore
{
    public class AppStoreFeed
    {
        [JsonProperty("feed")] public AppStoreReviewList ReviewsList { get; set; }
    }

    public class AppStoreReviewList
    {
        [JsonProperty("entry")] public List<AppStoreReview> ReviewsList { get; set; }
    }

    public class AppStoreReview
    {
        [JsonProperty("author")] public AppStoreAuthor Author { get; set; }

        [JsonProperty("im:version")] public string Version { get; set; }

        [JsonProperty("im:rating")] public int Rating { get; set; }

        [JsonProperty("title")] public string ReviewTitle { get; set; }

        [JsonProperty("content")] public List<AppStoreContent> Content { get; set; }

        [JsonProperty("id")] public string Id { get; set; }

        [JsonProperty("updated")] public DateTime CreationDate { get; set; }
    }

    public class AppStoreContent
    {
        [JsonProperty("#text")] public string Text { get; set; }
    }

    public class AppStoreAuthor
    {
        [JsonProperty("name")] public string Name { get; set; }
    }
}