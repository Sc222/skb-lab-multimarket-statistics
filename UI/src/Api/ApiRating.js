import {getRequestHeaders} from "./Helpers/ApiHelper";
import {MainConfig} from "../Config";

export async function getRatings(userId, appId, dateFrom, dateTo) {
    console.log(dateFrom);
    return fetch(`${MainConfig.ApiRoot}/api/Rating/${userId}/${appId}?from=${new Date(dateFrom).toISOString()}&to=${new Date(dateTo).toISOString()}`,
        {
            headers: getRequestHeaders(false),
            method: "GET",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            throw new Error("Ratings get error: " + result.status);
        });
}