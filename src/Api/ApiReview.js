import {ApiRoot, getRequestHeaders} from "./Helpers/ApiHelper";

export async function getReviews(userId, appId, skip, take, marketKey, date = undefined, versions = [], ratings = []) {
    let requestLink = `${ApiRoot}/api/Review/${userId}/${appId}?skip=${skip}&take=${take}&market=${marketKey}`;
    if (date!==undefined)
        requestLink += `&from=${new Date(date.dateFrom).toISOString()}&to=${new Date(date.dateTo).toISOString()}`;
    if (versions.length>0)  //todo versions.length>0 check is not needed?
        requestLink += `&version=${versions.join("&version=")}`
    if (ratings.length>0)   //todo ratings.length>0 check is not needed?
        requestLink += `&rating=${ratings.join("&rating=")}`
    console.log(`GET REVIEWS LINK: ${requestLink}`);

    //TODO FINISH

    return fetch(requestLink,
        {
            headers: getRequestHeaders(false),
            method: "GET",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            throw new Error("Reviews get error: " + result.status);
        });
}