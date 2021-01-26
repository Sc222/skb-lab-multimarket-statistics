import {ApiRoot} from "./ApiHelper";

export async function getNotifications(userId) {
    return fetch(`${ApiRoot}/api/Notification/${userId}`,
        {
            headers: {
                "Accept": "application/json"
            },
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
            headers: {
                "Accept": "application/json"
            },
            method: "DELETE"
        });
}

export async function deleteNotifications(userId, notificationIds) {
    return fetch(`${ApiRoot}/api/Notification/${userId}?id=${notificationIds.join("&id=")}`,
        {
            method: "DELETE"
        });
}

export async function deleteAllNotifications(userId) {
    return fetch(`${ApiRoot}/api/Notification/${userId}/all`,
        {
            headers: {
                "Accept": "application/json"
            },
            method: "DELETE"
        });
}