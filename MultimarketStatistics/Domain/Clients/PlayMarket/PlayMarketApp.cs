using Newtonsoft.Json;

namespace Domain.Clients.PlayMarket
{
    public class PlayMarketApp
    {
        [JsonProperty("histogram")] public PlayMarketRating Rating { get; set; }

        [JsonProperty("ratings")] public int Total { get; set; }

        [JsonProperty("icon")] public string IconUrl { get; set; }
    }

    public class PlayMarketRating
    {
        [JsonProperty("5")] public int FiveStars { get; set; }

        [JsonProperty("4")] public int FourStars { get; set; }

        [JsonProperty("3")] public int ThreeStars { get; set; }

        [JsonProperty("2")] public int TwoStars { get; set; }

        [JsonProperty("1")] public int OneStars { get; set; }
    }
}