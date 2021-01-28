//appGalleryId, appStoreId, playMarketId are removed on send

import {AppGalleryIndex, AppStoreIndex, PlayStoreIndex} from "../Helpers/MarketsInfoHelper";
import {getDefaultUser} from "./ApiUserHelper";

export function getDefaultAppNoIdNoPicNoMarkets(){
    return {name:"", description:""};
}

export function getDefaultAppNoIdNoPic(){
    const app = getDefaultAppNoIdNoPicNoMarkets();
    app.appGalleryId="";
    app.appStoreId="";
    app.playMarketId="";
    return app;
}

export function getDefaultAppNoId(){
    const app = getDefaultAppNoIdNoPic();
    app.picUrl="";
    return app;
}

export function getDefaultApp(){
    const app = getDefaultAppNoId();
    app.id="";
    return app;
}

export function createAppForCreate(app, selectedMarkets) {
    const appResult = getDefaultAppNoIdNoPicNoMarkets();
    appResult.name=app.name;
    appResult.description=app.description;
    if(selectedMarkets[AppGalleryIndex] && app.appGalleryId!=="")
        appResult.appGalleryId=app.appGalleryId;
    if(selectedMarkets[AppStoreIndex] && app.appStoreId!=="")
        appResult.appStoreId=app.appStoreId;
    if(selectedMarkets[PlayStoreIndex] &&app.playMarketId!=="")
        appResult.playMarketId=app.playMarketId;
    return appResult;
}

export function createAppForUpdate(app, appId, selectedMarkets) {
    const appResult = createAppForCreate(app,selectedMarkets);
    appResult.id=appId;
    return appResult;
}


//if app doesn't have such market undefined is returned
export function getMarketIdByStoreIndex(app, storeIndex){
    switch (storeIndex){
        case PlayStoreIndex:
            return app.playMarketId;
        case AppStoreIndex:
            return app.appStoreId;
        case AppGalleryIndex:
            return app.appGalleryId;
    }
    return undefined;
}

//array of marketIndexes where app is available
export function getAppMarketsArray(app){
    let result = [];
    if(app.playMarketId!==undefined)
        result.push(PlayStoreIndex);
    if(app.appStoreId!==undefined)
        result.push(AppStoreIndex);
    if(app.appGalleryId!==undefined)
        result.push(AppGalleryIndex);
    return result;
}