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
            throw new Error("Notifications error: " + result.status);
        });
}

export async function deleteNotification(notificationId) {
    return fetch(`${ApiRoot}/api/Notification/?id=${notificationId}`,
        {
            method: "DELETE",
        });
}