import {ApiRoot} from "./ApiHelper";
import {getCookieToken} from "../Helpers/CookieHelper";

export async function getRatings(userId,appId, dateFrom, dateTo) {
    console.log(dateFrom);
    return fetch(`${ApiRoot}/api/Rating/${userId}/${appId}?from=${new Date(dateFrom).toISOString()}&to=${new Date(dateTo).toISOString()}`,
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
            throw new Error("Ratings get error: " + result.status);
        });
}