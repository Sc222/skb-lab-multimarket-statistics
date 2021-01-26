import {ApiRoot} from "./ApiHelper";
import {getCookieToken} from "../Helpers/CookieHelper";

export async function getReviews(userId, appId, skip, take, marketKey) {
    return fetch(`${ApiRoot}/api/Review/${userId}/${appId}?skip=${skip}&take=${take}&market=${marketKey}`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${getCookieToken()}`
            },
            method: "GET",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            throw new Error("Reviews get error: " + result.status);
        });
}