import googlePlayDisabled from "../images/google-play-disabled.svg";
import googlePlay from "../images/google-play.svg";
import appStoreDisabled from "../images/app-store-disabled.svg";
import appStore from "../images/app-store.svg";
import appGalleryDisabled from "../images/appgallery-disabled.svg";
import appGallery from "../images/appgallery.svg";

export const PlayStoreIndex = 0;
export const AppStoreIndex = 1;
export const AppGalleryIndex = 2;

export const MarketsLinks = ["https://play.google.com/store/apps/details?id=","https://apps.apple.com/app/id","https://appgallery.huawei.com/#/app/"]

export const MarketsKeys = ["playStore", "appStore", "appGallery"];

// todo use key not index
export const MarketsInfoHelper = [
    {
        name: "Play Store",
        description: "Найдите свое приложение в Google Play Store",
        getIcon: (disabled) => {
            return disabled ? googlePlayDisabled : googlePlay
        },
        getChartColor: (theme) => {
            return theme.palette.secondary.main;
        }
    },
    {
        name: "App Store",
        description: "Найдите свое приложение в Apple App Store",
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
        getIcon: (disabled) => {
            return disabled ? appGalleryDisabled : appGallery
        },
        getChartColor: (theme) => {
            return theme.palette.success.main;
        }
    }
];

export function getChipChartColor(theme, index, isSelected) {
    if (!isSelected)
        return theme.palette.action.selected;
    return MarketsInfoHelper[index].getChartColor(theme);
}

export function createLinkFromId(marketIndex, id){
    if (id===undefined) return "";
    if(marketIndex>=0 && marketIndex<MarketsLinks.length)
        return MarketsLinks[marketIndex]+id;
    return "";
}