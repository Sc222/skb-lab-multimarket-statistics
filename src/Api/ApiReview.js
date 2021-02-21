import {ApiRoot, getRequestHeaders} from "./ApiHelper";

export async function getReviews(userId, appId, skip, take, marketKey) {
    return fetch(`${ApiRoot}/api/Review/${userId}/${appId}?skip=${skip}&take=${take}&market=${marketKey}`,
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