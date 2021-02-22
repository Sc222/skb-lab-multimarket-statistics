import {ApiRoot, getRequestHeaders} from "./Helpers/ApiHelper";

export async function getNotifications(userId) {
    return fetch(`${ApiRoot}/api/Notification/${userId}`,
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
    return fetch(`${ApiRoot}/api/Notification/${userId}/${appId}/${notificationId}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE"
        });
}

export async function deleteAllNotificationsForApp(userId, appId) {
    return fetch(`${ApiRoot}/api/Notification/${userId}/${appId}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE"
        });
}

export async function deleteAllNotifications(userId) {
    return fetch(`${ApiRoot}/api/Notification/${userId}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE"
        });
}