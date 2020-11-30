import googlePlayDisabled from "../images/google-play-disabled.svg";
import googlePlay from "../images/google-play.svg";
import appStoreDisabled from "../images/app-store-disabled.svg";
import appStore from "../images/app-store.svg";
import appGalleryDisabled from "../images/appgallery-disabled.svg";
import appGallery from "../images/appgallery.svg";

export const MarketsKeys = ["playStore", "appStore", "appGallery"];

// todo use key not index
export const MarketsInfo = [
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
    return MarketsInfo[index].getChartColor(theme);
}