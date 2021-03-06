import {ReviewFilterDateKey, ReviewFilterRatingKey, ReviewFilterVersionKey} from "./Helpers/MarketsInfoHelper";

export const UIProperties = {
    maxNotificationsInPopup: 200,
    reviewsPerPageDefault: 10,
    reviewsPerPageVariants: [5, 10, 25, 50, 100, 250]
};
export const UIDefaultValues = {
    dateTimePickerFrom: () => new Date(new Date().setDate(new Date().getDate() - 1)),
    reviewFilters: {
        [ReviewFilterDateKey]: undefined,
        [ReviewFilterVersionKey]: undefined,
        [ReviewFilterRatingKey]: undefined
    },
    reviewFilterToEdit: {key: "", value: undefined}
}