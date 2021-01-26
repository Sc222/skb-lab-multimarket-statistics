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
            throw new Error("App create error: " + result.status);
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
            throw new Error("Apps get error: " + result.status);
        });
}

export async function getApp(userId, appId) {
    return fetch(`${ApiRoot}/api/App/${userId}/${appId}`,
        {
            headers: {
                "Accept": "application/json"
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