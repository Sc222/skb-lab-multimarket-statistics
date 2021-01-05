﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Storage.Entities;

namespace Domain
{
    public static class Extensions
    {
        public static IEnumerable<T> SkipOrAll<T>(this IEnumerable<T> src, int? skip)
        {
            return skip.HasValue ? src.Skip(skip.Value) : src;
        }

        public static IEnumerable<T> TakeOrAll<T>(this IEnumerable<T> src, int? take)
        {
            return take.HasValue ? src.Take(take.Value) : src;
        }

        public static MarketType ToMarketType(this string market) =>
            market switch
            {
                "playMarket" => MarketType.PlayMarket,
                "appStore" => MarketType.AppStore,
                "appGallery" => MarketType.AppGallery,
                _ => throw new ArgumentException("Market cannot be null!")
            };
    }
}
