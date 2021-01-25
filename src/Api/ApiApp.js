import {ApiRoot} from "./ApiHelper";

export async function createApp(userId, app) {
    return fetch(`${ApiRoot}/api/App/create/${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(app),
            method: "POST",
        })
        .then(result => {
            if (result.ok)
                return result.text();
            throw new Error("Apps error: " + result.status);
        });
}

export async function getApps(userId) {
    return fetch(`${ApiRoot}/api/App/${userId}/apps`,
        {
            headers: {
                "Accept": "application/json"
            },
            method: "GET",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            throw new Error("Apps error: " + result.status);
        });
}