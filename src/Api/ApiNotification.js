import {ApiRoot, getRequestHeaders} from "./ApiHelper";

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

export async function deleteNotification(userId, notificationId) {
    return fetch(`${ApiRoot}/api/Notification/${userId}?id=${notificationId}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE"
        });
}

export async function deleteNotifications(userId, notificationIds) {
    return fetch(`${ApiRoot}/api/Notification/${userId}?id=${notificationIds.join(",")}`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE"
        });
}

export async function deleteAllNotifications(userId) {
    return fetch(`${ApiRoot}/api/Notification/${userId}/all`,
        {
            headers: getRequestHeaders(false),
            method: "DELETE"
        });
}