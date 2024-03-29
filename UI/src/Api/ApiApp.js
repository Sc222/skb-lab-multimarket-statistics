import {getRequestHeaders, Success} from "./Helpers/ApiHelper";
import {MainConfig} from "../Config";

export async function createApp(userId, app) {
    return fetch(`${MainConfig.ApiRoot}/api/App/create/${userId}`,
        {
            headers: getRequestHeaders(true),
            body: JSON.stringify(app),
            method: "POST",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            throw new Error("App create error: " + result.status);
        });
}

export async function updateApp(userId, app) {
    return fetch(`${MainConfig.ApiRoot}/api/App/update/${userId}`,
        {
            headers: getRequestHeaders(true),
            body: JSON.stringify(app),
            method: "PUT",
        })
        .then(result => {
            if (result.ok)
                return result.text();
            throw new Error("App update error: " + result.status);
        });
}

export async function getApps(userId) {
    return fetch(`${MainConfig.ApiRoot}/api/App/${userId}/apps`,
        {
            headers: getRequestHeaders(false),
            method: "GET",
        })
        .then(result => {
            if (result.ok)
                return result.json();
            throw new Error("Apps get error: " + result.status);
        });
}

export async function getApp(userId, appId) {
    return fetch(`${MainConfig.ApiRoot}/api/App/${userId}/${appId}`,
        {
            headers: getRequestHeaders(false),
            method: "GET",
        })
        .then(result => {
            if (result.ok) {
                if (result.status === Success)
                    return result.json();
                throw new Error(result.status.toString());
            }
            throw new Error("App get error: " + result.status);
        });
}

export async function getAppVersions(userId, appId, marketKey) {
    return fetch(`${MainConfig.ApiRoot}/api/App/${userId}/${appId}/versions?market=${marketKey}`,
        {
            headers: getRequestHeaders(false),
            method: "GET",
        })
        .then(result => {
            if (result.ok) {
                if (result.status === Success)
                    return result.json();
                throw new Error(result.status.toString());
            }
            throw new Error("App get error: " + result.status);
        });
}

export async function deleteApp(userId, appId) {
    return fetch(`${MainConfig.ApiRoot}/api/App/${userId}/${appId}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE",
        })
        .then(result => {
            if (result.ok)
                return result.text();
            throw new Error("App delete error: " + result.status);
        });
}