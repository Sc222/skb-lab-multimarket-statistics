using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Clients.AppStore
{
    public class AppStoreAppResult
    {
        [JsonProperty("results")] public List<AppStoreApp> Result { get; set; }
    }

    public class AppStoreApp
    {
        [JsonProperty("artworkUrl512")] public string PicUrl { get; set; }

        [JsonProperty("averageUserRating")] public double AverageRating { get; set; }
    }
}
