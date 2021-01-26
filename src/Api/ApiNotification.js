import {ApiRoot} from "./ApiHelper";
import {getCookieToken} from "../Helpers/CookieHelper";

export async function getNotifications(userId) {
    return fetch(`${ApiRoot}/api/Notification/${userId}`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${getCookieToken()}`
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
                "Accept": "application/json",
                "Authorization": `Bearer ${getCookieToken()}`
            },
            method: "DELETE"
        });
}

export async function deleteNotifications(userId, notificationIds) {
    return fetch(`${ApiRoot}/api/Notification/${userId}?id=${notificationIds.join("&id=")}`,
        {
            headers: {
                "Authorization": `Bearer ${getCookieToken()}`
            },
            method: "DELETE"
        });
}

export async function deleteAllNotifications(userId) {
    return fetch(`${ApiRoot}/api/Notification/${userId}/all`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${getCookieToken()}`
            },
            method: "DELETE"
        });
}