import {ApiRoot, getRequestHeaders} from "./Helpers/ApiHelper";

export async function getReviews(userId, appId, skip, take, marketKey, date = undefined, versions = [], ratings = []) {
    let requestLink = `${ApiRoot}/api/Review/${userId}/${appId}?skip=${skip}&take=${take}&market=${marketKey}`;
    if (date !== undefined)
        requestLink += `&from=${new Date(date.dateFrom).toISOString()}&to=${new Date(date.dateTo).toISOString()}`;
    if (versions.length > 0)
        requestLink += `&version=${versions.join("&version=")}`
    if (ratings.length > 0)
        requestLink += `&rating=${ratings.join("&rating=")}`
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