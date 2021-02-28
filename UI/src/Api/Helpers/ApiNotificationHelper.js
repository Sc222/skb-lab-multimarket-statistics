export function filterNotificationsByApp(notifications, app){
    return notifications.filter(notification => notification.appId === app.id);
}