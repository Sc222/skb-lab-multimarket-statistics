//array of marketIndexes where app is available
import {AppGalleryIndex, AppStoreIndex, MarketRatingPrecision, PlayStoreIndex} from "../../Helpers/MarketsInfoHelper";
import {getAppMarketsArray} from "./ApiAppHelper";
import {formatDateDefault} from "../../Helpers/UtilsHelper";

//  dict of {date:"",rating:""}
export function getLatestRatings(ratings,app){
    let result = {};
    let markets = getAppMarketsArray(app);
    markets.forEach(marketIndex=>{
        result[marketIndex]=getLatestMarketRating(ratings,marketIndex);
    })
    console.log("markets: "+markets);
    console.log(result);
    return result;
}

//  {date:"",rating:""}
export function getLatestMarketRating(ratings, marketIndex){
    let i=ratings.length-1;
    while(i>=0){
        let marketRating = getMarketRatingByStoreIndex(ratings[i],marketIndex);
        if(marketRating!==undefined && marketRating!==0 && !isNaN(marketRating))
            return {date:formatDateDefault(new Date(ratings[i].date)), rating:parseFloat(marketRating).toPrecision(MarketRatingPrecision)};
        i--;
    }
    return {date:"", rating:0};
}

//if rating doesn't have such market undefined is returned
export function getMarketRatingByStoreIndex(rating, storeIndex){
    switch (storeIndex){
        case PlayStoreIndex:
            return rating.playMarketRating;
        case AppStoreIndex:
            return rating.appStoreRating;
        case AppGalleryIndex:
            return rating.appGalleryRating;
    }
    return undefined;
}
