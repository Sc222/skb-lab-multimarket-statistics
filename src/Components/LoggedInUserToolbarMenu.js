import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import {Link as RouterLink} from "react-router-dom";
import {HomepageUrl} from "../App";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import demoProfile from "../images/demo_profile.png";
import Popover from "@material-ui/core/Popover";
import {UIProperties} from "../Config";
import {NotificationsRounded, WarningRounded} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {deleteAllSessionCookies} from "../Helpers/CookieHelper";
import update from "immutability-helper";
import {deleteAllNotifications as apiDeleteAllNotifications, deleteNotification} from "../Api/ApiNotification";
import {useMarginStyles} from "../Styles/MarginStyles";

const useStyles = makeStyles((theme) => ({
    flex: {
        display: "flex"
    },
    profileIconButton: {
        marginLeft: theme.spacing(1.5),
        padding: 0
    },
    profileIcon: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5)
    },

    //popover styles
    popover: {
        width: theme.spacing(30),
        maxHeight: theme.spacing(25)
    },
    fullWidth: {
        width: "100%"
    },
    popoverContainer: {
        paddingRight: theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
}));

ServiceNameAndLogo.defaultProps = {
    centered: false,
    fontColor: "inherit"
}

export default function ServiceNameAndLogo(props) {
    const classes = useStyles();
    const margins = useMarginStyles();

    const [notificationPopoverAnchor, setNotificationPopoverAnchor] = React.useState(null);
    const [profilePopoverAnchor, setProfilePopoverAnchor] = React.useState(null);

    function logout() {
        setProfilePopoverAnchor(null);
        deleteAllSessionCookies();
    }

    function toggleNotificationsPopover(event) {
        if (notificationPopoverAnchor)
            setNotificationPopoverAnchor(null);
        else
            setNotificationPopoverAnchor(event.currentTarget);
    }

    function toggleProfilePopover(event) {
        if (profilePopoverAnchor)
            setProfilePopoverAnchor(null);
        else
            setProfilePopoverAnchor(event.currentTarget.parentElement);
    }

    function updateNotifications(notificationId, appId, index) {
        console.log("delete notification");
        console.log(props.notifications);
        let newNotifications = update(props.notifications, {$splice: [[index, 1]]});
        console.log(newNotifications);
        props.updateUserNotifications(newNotifications);
        deleteNotification(props.userId, appId, notificationId).then(result => {
            if (!result.ok) {
                props.showStatusAlert("Не удалось удалить уведомление", "error");
                props.updateIsTokenExpired(result.status.toString());
            }
            console.log(result.status);
        });
    }

    function deleteAllNotifications() {
        console.log("delete all notifications");
        apiDeleteAllNotifications(props.userId)
            .then(result => {
                if (result.ok) {
                    props.updateUserNotifications([]);
                    setNotificationPopoverAnchor(null);
                } else {
                    console.log("error deleting notifications");
                    props.showStatusAlert("Не удалось очистить уведомления", "error")
                    props.updateIsTokenExpired(result.status.toString());
                }
            });
    }

    return (
        <>
            <IconButton color="inherit" onClick={(event) => toggleNotificationsPopover(event)}
                        aria-describedby="notification-popover">
                <Badge badgeContent={props.notifications?.length} color="secondary">
                    <NotificationsRounded/>
                </Badge>
            </IconButton>

            {/*todo !!! USER PROFILE PIC load profile picture from server*/}
            <IconButton className={classes.profileIconButton} color="inherit"
                        onClick={(event) => toggleProfilePopover(event)}
                        aria-describedby="profile-popover"
            >
                <Avatar className={classes.profileIcon} alt="Profile picture" src={demoProfile}/>
            </IconButton>

            <Popover
                id="notification-popover"
                open={notificationPopoverAnchor !== null}
                anchorEl={notificationPopoverAnchor}
                onClose={() => toggleNotificationsPopover(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <div className={classes.popover}>
                    {props.notifications !== undefined && props.notifications.length > UIProperties.maxNotificationsInPopup &&
                    <div>
                        <div className={classes.popoverContainer}>
                            <div className={classes.flex}>
                                <WarningRounded color="primary"/>
                                <Typography variant="body1" color="primary">
                                    Уведомлений: {props.notifications.length}
                                </Typography>
                            </div>
                            <Typography variant="body2" color="textSecondary">
                                Показано уведомлений: {UIProperties.maxNotificationsInPopup}
                            </Typography>
                        </div>
                        <Divider className={classes.fullWidth}/>
                    </div>
                    }
                    {
                        props.notifications?.slice(0, UIProperties.maxNotificationsInPopup).map((notification, index) => {
                            return (
                                <div key={notification.id}>
                                    <div className={classes.popoverContainer}>
                                        <Typography variant="body1" color="textPrimary">
                                            {notification.title}
                                        </Typography>
                                        <Typography variant="body2"
                                                    color="textSecondary">{notification.text}</Typography>
                                        <Typography>
                                            <Link
                                                component={RouterLink}
                                                variant="body2"
                                                onClick={() => setNotificationPopoverAnchor(null)}
                                                to={`${HomepageUrl}/user/${props.userId}/app/${notification.appId}/dashboard/`}
                                            >
                                                Посмотреть
                                            </Link>
                                            <Link
                                                className={margins.m1L}
                                                component="button"
                                                variant="body2"
                                                color="error"
                                                onClick={() => updateNotifications(notification.id, notification.appId, index)}
                                            >
                                                Удалить
                                            </Link>
                                        </Typography>
                                    </div>
                                    <Divider className={classes.fullWidth}/>
                                </div>
                            );
                        })
                    }
                    {props.notifications !== undefined && props.notifications.length !== 0 &&
                    <div className={classes.popoverContainer}>
                        <Link
                            component="button"
                            onClick={() => deleteAllNotifications()}
                        >
                            Удалить все уведомления
                        </Link>
                    </div>
                    }
                    {props.notifications !== undefined && props.notifications.length === 0 &&
                    <div className={classes.popoverContainer}>
                        <div className={classes.flex}>
                            <Typography variant="body1" color="inherit">
                                Уведомлений нет
                            </Typography>
                        </div>
                    </div>
                    }
                    {props.notifications === undefined &&
                    <div className={classes.popoverContainer}>
                        <div className={classes.flex}>
                            <Typography variant="body1" color="inherit">
                                Загрузка уведомлений
                            </Typography>
                        </div>
                    </div>
                    }
                </div>
            </Popover>

            <Popover
                id="profile-popover"
                open={profilePopoverAnchor !== null}
                anchorEl={profilePopoverAnchor}
                onClose={() => toggleProfilePopover(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <div className={classes.popover}>
                    <div className={classes.popoverContainer}>
                        <Typography variant="subtitle1" color="primary">
                            <Box ml={0.5} fontWeight="fontWeightMedium">
                                {props.user.username}
                            </Box>
                        </Typography>
                    </div>
                    <Divider className={classes.fullWidth}/>
                    <List dense>
                        <ListItem onClick={() => setProfilePopoverAnchor(null)}
                                  button
                                  component={RouterLink}
                                  to={`${HomepageUrl}/user/${props.userId}/apps`}
                        >
                            <ListItemText primary={"Приложения"}/>
                        </ListItem>
                        <ListItem onClick={() => setProfilePopoverAnchor(null)}
                                  button
                                  component={RouterLink}
                                  to={`${HomepageUrl}/user/${props.userId}/profile`}
                        >
                            <ListItemText primary={"Настройки"}/>
                        </ListItem>
                        <ListItem component={RouterLink}
                                  onClick={() => logout()}
                                  to={`${HomepageUrl}/`}
                                  button
                        >
                            <ListItemText primary={"Выйти"}/>
                        </ListItem>
                    </List>
                </div>
            </Popover>
        </>
    );
}
