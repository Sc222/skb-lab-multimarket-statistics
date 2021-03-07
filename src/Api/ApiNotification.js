import {getRequestHeaders} from "./Helpers/ApiHelper";
import {MainConfig} from "../Config";

export async function getNotifications(userId) {
    return fetch(`${MainConfig.ApiRoot}/api/Notification/${userId}`,
        {
            headers: getRequestHeaders(false),
            method: "GET",
        })
        .then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error("Notifications get error: " + result.status);
        });
}

export async function deleteNotification(userId, appId, notificationId) {
    return fetch(`${MainConfig.ApiRoot}/api/Notification/${userId}/${appId}/${notificationId}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE"
        });
}

export async function deleteAllNotificationsForApp(userId, appId) {
    return fetch(`${MainConfig.ApiRoot}/api/Notification/${userId}/${appId}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE"
        });
}

export async function deleteAllNotifications(userId) {
    return fetch(`${MainConfig.ApiRoot}/api/Notification/${userId}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE"
        });
}