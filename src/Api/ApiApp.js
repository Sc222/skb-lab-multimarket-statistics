import {ApiRoot} from "./ApiHelper";
import {getCookieToken} from "../Helpers/CookieHelper";

export async function createApp(userId, app) {

    return fetch(`${ApiRoot}/api/App/create/${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${getCookieToken()}`
            },
            body: JSON.stringify(app),
            method: "POST",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            throw new Error("App create error: " + result.status);
        });
}

export async function getApps(userId) {
    return fetch(`${ApiRoot}/api/App/${userId}/apps`,
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
            throw new Error("Apps get error: " + result.status);
        });
}

export async function getApp(userId, appId) {
    return fetch(`${ApiRoot}/api/App/${userId}/${appId}`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${getCookieToken()}`
            },
            method: "GET",
        })
        .then(result => {
            if (result.ok) {
                if (result.status === 200)
                    return result.json();
                throw new Error("App does not exist: " + result.status);
            }
            throw new Error("App get error: " + result.status);
        });
}