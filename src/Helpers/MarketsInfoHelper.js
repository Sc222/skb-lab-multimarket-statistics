import googlePlayDisabled from "../images/google-play-disabled.svg";
import googlePlay from "../images/google-play.svg";
import appStoreDisabled from "../images/app-store-disabled.svg";
import appStore from "../images/app-store.svg";
import appGalleryDisabled from "../images/appgallery-disabled.svg";
import appGallery from "../images/appgallery.svg";

export const PlayStoreIndex = 0;
export const AppStoreIndex = 1;
export const AppGalleryIndex = 2;

//utility constants
export const MarketRatingPrecision = 3;
export const MarketLatestRatingsDaysCheck = 3; //days before today, increase if "latest rating not found"
export const MarketStarsTemplate = [1, 2, 3, 4, 5];

export const MarketsLinks = [
    "https://play.google.com/store/apps/details?id=",
    "https://apps.apple.com/ru/app/id",  /*TODO !!! ADD LOCALES IN APP STORE*/
    "https://appgallery.huawei.com/#/app/"
];

/*
usual valid examples:
https://play.google.com/store/apps/details?id=com.snapchat.android
https://apps.apple.com/app/id564177498
https://appgallery.huawei.com/#/app/C101104117

hard valid examples:
https://play.google.com/store/apps/details?gl=US&id=com.snapchat.android&hl=de
https://apps.apple.com/ru/app/вконтакте-общение-и-музыка/id564177498
*/
export const MarketsLinksRegex = [
    /^https:\/\/play\.google\.com\/store\/apps\/details\/?[^\s\/]*$/,
    /^https:\/\/apps\.apple\.com\/?[^\s\/]*\/app\/?[^\s\/]*\/id([\d]+)\/?[^\s\/]*$/,
    /^https:\/\/appgallery\.huawei\.com\/#\/app\/(C[\d]+)(\?[^\s\/]*)?$/
];

export const MarketsIndexes = [PlayStoreIndex, AppStoreIndex, AppGalleryIndex]; // starts with 0 and +1

export const MarketsRequestKeys = ["playMarket", "appStore", "appGallery"];
export const IndexByRequestKey = MarketsRequestKeys.reduce((a, val, index) => ({...a, [val]: index}), {});

export const MarketsRatingKeys = ["playMarketRating", "appStoreRating", "appGalleryRating"];

export const MarketsInfo = [
    {
        name: "Play Store",
        description: "Найдите свое приложение в Google Play Store",
        homepage: "https://play.google.com/store",
        demoFormat: "https://play.google.com/store/apps/details?id=com.example.test",
        getIcon: (disabled) => {
            return disabled ? googlePlayDisabled : googlePlay
        },
        getChartColor: (theme) => {
            return theme.palette.success.main;
        }
    },
    {
        name: "App Store",
        description: "Найдите свое приложение в Apple App Store",
        homepage: "https://apps.apple.com",
        demoFormat: "https://apps.apple.com/app/id111111111",
        getIcon: (disabled) => {
            return disabled ? appStoreDisabled : appStore
        },
        getChartColor: (theme) => {
            return theme.palette.primary.main;
        }
    },
    {
        name: "AppGallery",
        description: "Найдите свое приложение в Huawei AppGallery",
        homepage: "https://appgallery.huawei.com/",
        demoFormat: "https://appgallery.huawei.com/#/app/C111111111",
        getIcon: (disabled) => {
            return disabled ? appGalleryDisabled : appGallery
        },
        getChartColor: (theme) => {
            return theme.palette.secondary.main;
        }
    }
];

export function getChipChartColor(theme, index, isSelected) {
    if (!isSelected)
        return theme.palette.action.selected;
    return MarketsInfo[index].getChartColor(theme);
}

export function createLinkFromId(marketIndex, id) {
    if (id === undefined) return "";
    if (marketIndex >= 0 && marketIndex < MarketsLinks.length)
        return MarketsLinks[marketIndex] + id;
    return "";
}

//returns "" if no appId
export function getAppIdFromUrl(marketIndex, link) {
    console.log("get app id: " + marketIndex + "link: " + link);
    let url;
    try {
        url = new URL(link);
    } catch (error) {
        return "";
    }

    if (marketIndex === PlayStoreIndex) {
        if (url.href.match(MarketsLinksRegex[marketIndex])) {
            const id = url.searchParams.get('id');
            return id !== null ? id : "";
        }
    }

    if (marketIndex === AppStoreIndex) {
        const match = url.href.match(MarketsLinksRegex[marketIndex]);
        if (match)
            return match[1];
    }

    if (marketIndex === AppGalleryIndex) {
        const match = url.href.match(MarketsLinksRegex[marketIndex]);
        if (match)
            return match[1];
    }
    return "";
}

export function getFirstExistingMarketRequestKey(app) {
    if (app.playMarketId !== undefined)
        return MarketsRequestKeys[PlayStoreIndex];
    if (app.appStoreId !== undefined)
        return MarketsRequestKeys[AppStoreIndex];
    if (app.appGalleryId !== undefined)
        return MarketsRequestKeys[AppGalleryIndex];
    return "";
}

export function getLatestRatingsStartCheckDate(date) {
    return date.setDate(date.getDate() - MarketLatestRatingsDaysCheck);
}