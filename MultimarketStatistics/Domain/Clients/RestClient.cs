﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using Domain.Clients.AppStore;

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
            var fullUri = new Uri(uri);
            var resultJson = await client.GetStringAsync(fullUri).ConfigureAwait(false);
            return JsonConvert.DeserializeObject<T>(resultJson);
        }

        public static async Task<T> GetFromXmlAsync<T>(HttpClient client, string uri)
        {
            var fullUri = new Uri(uri);
            var result = await client.GetStringAsync(fullUri).ConfigureAwait(false);
            var resultXml = new XmlDocument();
            resultXml.Load(new StringReader(result));
            var resultJson = JsonConvert.SerializeXmlNode(resultXml);
            return JsonConvert.DeserializeObject<T>(resultJson);
        }
    }
}
