import Alert from "@material-ui/lab/Alert";
import React from "react";
import AlertTitle from "@material-ui/lab/AlertTitle";

export function getAppNotificationsAlert(appNotifications) {
    return (
        <Alert severity="info" color="success">
            <AlertTitle>
                {appNotifications
                    ? appNotifications.length !== 0
                        ? "Есть новые отзывы"
                        : "Уведомлений нет"
                    : "Загрузка..."
                }
            </AlertTitle>
            {appNotifications
                ? appNotifications.length !== 0
                    ? <>Всего уведомлений о новых отзывах: <b>{appNotifications.length}</b></>
                    : "Новых уведомлений нет"
                : "Идет загрузка уведомлений"
            }
        </Alert>);
}
