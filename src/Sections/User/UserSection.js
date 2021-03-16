import React, {useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {WarningRounded} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import {Link as RouterLink, Redirect, Route, Switch as RouteSwitch, useLocation, useParams} from 'react-router-dom';
import {HomepageUrl} from "../../App";
import Apps from "./Apps";
import AppSection from "./App/AppSection";
import NewApplication from "./NewApp";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Profile from "./Profile";
import {
    deleteAllNotifications as apiDeleteAllNotifications,
    deleteNotification,
    getNotifications
} from "../../Api/ApiNotification";
import update from 'immutability-helper';
import Link from "@material-ui/core/Link";
import {getUser} from "../../Api/ApiUser";
import {getDefaultUser} from "../../Api/Helpers/ApiUserHelper";
import {
    deleteAllSessionCookies,
    getCookieToken,
    getCookieUserId,
    isCookieTokenExpired
} from "../../Helpers/CookieHelper";
import WrongUser from "./WrongUser";
import StatusAlert from "../../Components/StatusAlert";
import {UIProperties} from "../../Config";
import {ErrorUnauthorized} from "../../Api/Helpers/ApiHelper";
import demoProfile from '../../images/demo_profile.png';
import ServiceNameAndLogo from "../../Components/ServiceNameAndLogo";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    flex: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
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
        width: '100%'
    },
    popoverContainer: {
        paddingRight: theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    marginLeftSmall: {
        marginLeft: theme.spacing(1.5)
    }
}));

export default function UserSection() {
    let {userId} = useParams();

    let currentUrl = useLocation(); //used to redirect when token cookie expires

    const classes = useStyles()

    const statusAlert = useRef();

    const [isTokenExpired, setIsTokenExpired] = React.useState(isCookieTokenExpired());
    const [notificationPopoverAnchor, setNotificationPopoverAnchor] = React.useState(null);
    const [profilePopoverAnchor, setProfilePopoverAnchor] = React.useState(null);
    const [notifications, setNotifications] = React.useState(undefined);
    const [user, setUser] = React.useState(getDefaultUser());

    React.useEffect(() => {
        if(!isTokenExpired)
            setIsTokenExpired(isCookieTokenExpired());
    }, [currentUrl]);

    const updateUserNotifications = (newNotifications) => {
        setNotifications(newNotifications);
    };

    const showStatusAlert = (message, severity) => {
        statusAlert.current?.show(message, severity)
    };

    function updateIsTokenExpired(message) {
        if(!isTokenExpired && message.endsWith(ErrorUnauthorized)) {
            console.log("TOKEN IS EXPIRED: "+message);
            setIsTokenExpired(true);
        }
    }

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
        console.log(notifications);
        let newNotifications = update(notifications, {$splice: [[index, 1]]});
        console.log(newNotifications);
        setNotifications(newNotifications);
        deleteNotification(userId, appId, notificationId).then(result => {
            if (!result.ok) {
                showStatusAlert("Не удалось удалить уведомление", "error");
                updateIsTokenExpired(result.status.toString());
            }
            console.log(result.status);
        });
    }

    function deleteAllNotifications() {
        console.log("delete all notifications");
        apiDeleteAllNotifications(userId)
            .then(result => {
                if (result.ok) {
                    setNotifications([]);
                    setNotificationPopoverAnchor(null);
                } else {
                    console.log("error deleting notifications");
                    showStatusAlert("Не удалось очистить уведомления", "error")
                    updateIsTokenExpired(result.status.toString());
                }
            });
    }

    useEffect(() => {
        console.log(userId);

        Promise.all([getNotifications(userId), getUser(userId)])
            .then(([notifications, user]) => {
                console.log("load notifications");
                console.log(notifications);
                setNotifications(notifications);
                setUser(user);
            })
            .catch(err => {
                showStatusAlert("Не удалось получить данные", "error");
                updateIsTokenExpired(err.message);
                console.log(err.message)
            });
    }, []);

    return (
        <RouteSwitch>
            {/*redirect to login if userId exists but no token*/}
            {isTokenExpired &&
            <Redirect to={{pathname: `${HomepageUrl}/login`, search: `?referer=${currentUrl.pathname}`}}/>}

            {/*redirect to current user if wrong user*/}
            {getCookieToken() !== "" && getCookieUserId() !== "" && getCookieUserId() !== userId && <WrongUser/>}

            <div className={classes.root}>
                <AppBar position="absolute">
                    <Toolbar variant="dense">
                        <ServiceNameAndLogo/>

                        <IconButton color="inherit" onClick={(event) => toggleNotificationsPopover(event)}
                                    aria-describedby='notification-popover'>
                            <Badge badgeContent={notifications?.length} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>

                        {/*todo load profile picture from server*/}
                        <IconButton className={classes.profileIconButton} color='inherit'
                                    onClick={(event) => toggleProfilePopover(event)}
                                    aria-describedby='profile-popover'
                        >
                            <Avatar className={classes.profileIcon} alt='Profile picture' src={demoProfile}/>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Popover
                    id='notification-popover'
                    open={notificationPopoverAnchor !== null}
                    anchorEl={notificationPopoverAnchor}
                    onClose={() => toggleNotificationsPopover(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <div className={classes.popover}>
                        {notifications !== undefined && notifications.length > UIProperties.maxNotificationsInPopup &&
                        <div>
                            <div className={classes.popoverContainer}>
                                <div className={classes.flex}>
                                    <WarningRounded color='primary'/>
                                    <Typography variant='body1' color='primary'>
                                        Уведомлений: {notifications.length}
                                    </Typography>
                                </div>
                                <Typography variant='body2' color='textSecondary'>
                                    Показано уведомлений: {UIProperties.maxNotificationsInPopup}
                                </Typography>
                            </div>
                            <Divider className={classes.fullWidth}/>
                        </div>
                        }
                        {
                            notifications?.slice(0, UIProperties.maxNotificationsInPopup).map((notification, index) => {
                                return (
                                    <div key={notification.id}>
                                        <div className={classes.popoverContainer}>
                                            <Typography variant='body1' color='textPrimary'>
                                                {notification.title}
                                            </Typography>
                                            <Typography variant='body2'
                                                        color='textSecondary'>{notification.text}</Typography>
                                            <Typography>
                                                <Link
                                                    component={RouterLink}
                                                    variant="body2"
                                                    onClick={() => setNotificationPopoverAnchor(null)}
                                                    to={`${HomepageUrl}/user/${userId}/app/${notification.appId}/dashboard/`}
                                                >
                                                    Посмотреть
                                                </Link>
                                                <Link
                                                    className={classes.marginLeftSmall}
                                                    component="button"
                                                    variant="body2"
                                                    color='error'
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
                        {notifications !== undefined && notifications.length !== 0 &&
                        <div className={classes.popoverContainer}>
                            <Link
                                component="button"
                                onClick={() => deleteAllNotifications()}
                            >
                                Удалить все уведомления
                            </Link>
                        </div>
                        }
                        {notifications !== undefined && notifications.length === 0 &&
                        <div className={classes.popoverContainer}>
                            <div className={classes.flex}>
                                <Typography variant='body1' color='inherit'>
                                    Уведомлений нет
                                </Typography>
                            </div>
                        </div>
                        }
                        {notifications === undefined &&
                        <div className={classes.popoverContainer}>
                            <div className={classes.flex}>
                                <Typography variant='body1' color='inherit'>
                                    Загрузка уведомлений
                                </Typography>
                            </div>
                        </div>
                        }
                    </div>
                </Popover>

                <Popover
                    id='profile-popover'
                    open={profilePopoverAnchor !== null}
                    anchorEl={profilePopoverAnchor}
                    onClose={() => toggleProfilePopover(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <div className={classes.popover}>
                        <div className={classes.popoverContainer}>
                            <Typography variant='subtitle1' color='primary'>
                                <Box ml={0.5} fontWeight="fontWeightMedium">
                                    {user.username}
                                </Box>
                            </Typography>
                        </div>
                        <Divider className={classes.fullWidth}/>
                        <List dense>
                            <ListItem classes={{selected: classes.mainItemSelected}}
                                      className={classes.mainItem}
                                      onClick={() => setProfilePopoverAnchor(null)}
                                      button
                                      component={RouterLink}
                                      to={`${HomepageUrl}/user/${userId}/apps`}
                            >
                                <ListItemText primary={'Приложения'}/>
                            </ListItem>
                            <ListItem classes={{selected: classes.mainItemSelected}}
                                      className={classes.mainItem}
                                      onClick={() => setProfilePopoverAnchor(null)}
                                      button
                                      component={RouterLink}
                                      to={`${HomepageUrl}/user/${userId}/profile`}
                            >
                                <ListItemText primary={'Настройки'}/>
                            </ListItem>
                            <ListItem classes={{selected: classes.mainItemSelected}}
                                      className={classes.mainItem}
                                      component={RouterLink}
                                      onClick={() => logout()}
                                      to={`${HomepageUrl}/`}
                                      button
                            >
                                <ListItemText primary={'Выйти'}/>
                            </ListItem>
                        </List>
                    </div>
                </Popover>

                <StatusAlert ref={statusAlert}/>

                <main className={classes.content}>
                    <RouteSwitch>
                        <Route exact path={`${HomepageUrl}/user/:userId/apps`}>
                            <Apps userId={userId}/>
                        </Route>
                        <Route exact path={`${HomepageUrl}/user/:userId/new-app`}>
                            <NewApplication updateIsTokenExpired={updateIsTokenExpired} userId={userId} showStatusAlert={showStatusAlert}/>
                        </Route>
                        <Route exact path={`${HomepageUrl}/user/:userId/profile`}>
                            <Profile updateIsTokenExpired={updateIsTokenExpired} userId={userId} updatePopoverUser={setUser} showStatusAlert={showStatusAlert}/>
                        </Route>
                        <Route path={`${HomepageUrl}/user/:userId/app/:appId`}>
                            <AppSection updateIsTokenExpired={updateIsTokenExpired} userId={userId} showStatusAlert={showStatusAlert}
                                        updateUserNotifications={updateUserNotifications}/>
                        </Route>

                        <Redirect to={`${HomepageUrl}/user/${userId}/apps`}/>

                    </RouteSwitch>
                </main>
            </div>
        </RouteSwitch>
    );
}