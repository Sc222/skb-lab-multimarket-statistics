using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Domain.Clients.PlayMarket
{
    public class PlayMarketResult
    {
        [JsonProperty("data")] public List<PlayMarketReview> Reviews { get; set; }

        [JsonProperty("nextPaginationToken")] public string PaginationToken { get; set; }
    }

    public class PlayMarketReview
    {
        [JsonProperty("id")] public string Id { get; set; }

        [JsonProperty("userName")] public string Username { get; set; }

        [JsonProperty("date")] public DateTime Date { get; set; }

        [JsonProperty("score")] public int Score { get; set; }

        [JsonProperty("text")] public string Text { get; set; }

        [JsonProperty("version")] public string Version { get; set; }
    }
}