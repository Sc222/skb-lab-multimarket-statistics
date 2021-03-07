import {MarketsRequestKeys, MarketStarsTemplate} from "../../Helpers/MarketsInfoHelper";
import {getReviews} from "../ApiReview";
import {formatDateDefault, formatDateShort} from "../../Helpers/UtilsHelper";

export const ReviewFilterDateKey = "date";
export const ReviewFilterVersionKey = "version";
export const ReviewFilterRatingKey = "rating";
export const ReviewFilterRatings = [
    {name: "5 звезд", value: 5},
    {name: "4 звезды", value: 4},
    {name: "3 звезды", value: 3},
    {name: "2 звезды", value: 2},
    {name: "1 звезда", value: 1},
];
export const ReviewFilterTypes = (selectedFilter, filterToEditKey = "") => {
    if (filterToEditKey !== "")
        return [{name: ReviewFilterInfo[filterToEditKey].name, value: filterToEditKey, disabled: false}];
    return [
        {name: "Дата", value: ReviewFilterDateKey, disabled: selectedFilter[ReviewFilterDateKey] !== undefined},
        {name: "Версия", value: ReviewFilterVersionKey, disabled: selectedFilter[ReviewFilterVersionKey] !== undefined},
        {name: "Оценка", value: ReviewFilterRatingKey, disabled: selectedFilter[ReviewFilterRatingKey] !== undefined}
    ];
}

export const ReviewFilterInfo = {
    [ReviewFilterDateKey]: {
        name: "Дата",
        getLabel: (date) => `${formatDateShort(date.dateFrom)} - ${formatDateShort(date.dateTo)}`
    },
    [ReviewFilterVersionKey]: {
        name: "Версия",
        getLabel: (selected) => `выбрано: ${selected.length}`
    },
    [ReviewFilterRatingKey]: {
        name: "Оценка",
        getLabel: (selected) => selected.length === MarketStarsTemplate.length ? "любая" : selected.join(', ')
    }
};

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