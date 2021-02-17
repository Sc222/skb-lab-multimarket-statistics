import {MarketsRequestKeys} from "../Helpers/MarketsInfoHelper";
import {getReviews} from "./ApiReview";
import {formatDateDefault} from "../Helpers/UtilsHelper";

export function getReviewsMultipleMarkets(userId, appId, skip, take, markets) {
    return markets.map(marketIndex => getReviews(userId, appId, skip, take, MarketsRequestKeys[marketIndex]));
}

export function getDefaultLatestReview(marketIndex) {
    return {marketIndex: marketIndex, date: "", rating: 0, text: "", version: ""};
}

export function getLatestReviews(reviews) {
    return reviews.map((review, index)=>{
        let result =getDefaultLatestReview(index);
        if(review.foundItem.length>0){
            let latest = review.foundItem[0];
            result.date = formatDateDefault(new Date(latest.date));
            result.rating = latest.rating;
            result.text = latest.text;
            if(latest.version!==undefined)
                result.version = latest.version;
            if(latest.reviewerUsername!==undefined)
                result.reviewerUsername = latest.reviewerUsername;
        }
        return result;
    });
}