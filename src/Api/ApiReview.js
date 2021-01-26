import {ApiRoot} from "./ApiHelper";

export async function getReviews(userId, appId, skip, take, marketKey) {
    return fetch(`${ApiRoot}/api/Rating/${userId}/${appId}?skip=${skip}&take=${take}&market=${marketKey}`,
        {
            headers: {
                "Accept": "application/json"
            },
            method: "GET",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            throw new Error("Reviews get error: " + result.status);
        });
}