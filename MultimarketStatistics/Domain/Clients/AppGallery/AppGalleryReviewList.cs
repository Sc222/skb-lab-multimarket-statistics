using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Domain.Clients.AppGallery
{
    public class AppGalleryReviewList
    {
        [JsonProperty("list")] public List<AppGalleryReview> ReviewsList { get; set; }
    }

    public class AppGalleryReview
    {
        [JsonProperty("commentInfo")] public string Text { get; set; }

        [JsonProperty("commentId")] public string Id { get; set; }

        [JsonProperty("nickName")] public string ReviewerUsername { get; set; }

        [JsonProperty("operTime")] public DateTime Date { get; set; }

        [JsonProperty("photoUrl")] public string PhotoUrl { get; set; }

        [JsonProperty("rating")] public int Rating { get; set; }

        [JsonProperty("replyComment")] public string DevResponse { get; set; }

        [JsonProperty("versionName")] public string Version { get; set; }
    }
}