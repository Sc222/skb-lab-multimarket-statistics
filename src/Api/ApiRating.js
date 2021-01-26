import {ApiRoot} from "./ApiHelper";

export async function getRatings(userId,appId, dateFrom, dateTo) {
    console.log(dateFrom);
    return fetch(`${ApiRoot}/api/Rating/${userId}/${appId}?from=${new Date(dateFrom).toISOString()}&to=${new Date(dateTo).toISOString()}`,
        {
            headers: {
                "Accept": "application/json"
            },
            method: "GET",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            throw new Error("Notifications error: " + result.status);
        });
}