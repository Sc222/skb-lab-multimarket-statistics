using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Clients
{
    public static class RestClient
    {
        public static HttpClient GetClient()
        {
            var client = new HttpClient();
            return client;
        }

        public static async Task<T> GetAsync<T>(HttpClient client, string uri)
        {
            using (client)
            {
                var fullUri = new Uri(uri);
                var resultJson = await client.GetStringAsync(fullUri).ConfigureAwait(false);
                return JsonConvert.DeserializeObject<T>(resultJson);
            }
        }
    }
}
