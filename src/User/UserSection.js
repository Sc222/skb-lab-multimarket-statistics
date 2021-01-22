import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Avatar from "@material-ui/core/Avatar";

import {Link as RouterLink, Route, Switch as RouteSwitch, useLocation, useParams} from 'react-router-dom';

//image imports
import demoProfile from '../images/demo_profile.png';
import {fade} from "@material-ui/core";
import {HomepageUrl} from "../App";
import Applications from "./Applications";
import ApplicationSection from "./Application/ApplicationSection";
import NewApplication from "./NewApplication";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import {NewReleasesRounded} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Profile from "./Profile";
import getUserId from "../Api/ApiTmpConstants";

import {deleteNotification, getNotifications} from "../Api/ApiNotifications";

import update from 'immutability-helper';
import Link from "@material-ui/core/Link";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        height: '48px'
    },

    root: {
        display: 'flex',
    },

    flex: {
        display: 'flex'
    },

    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    backToAppsButton: {
        width: '100%'
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        /*textAlign:"center" todo toolbar title styles here*/
    },

    /*TODO FIX SMOOTH PERSISTENT DRAWER OPEN ANIMATION*/
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    profileIconButton: {
        marginLeft: theme.spacing(1.5),
        padding: 0
    },
    profileIcon: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    },


    //search toolbar styles
    extraToolbar: {
        background: "transparent",
        color: theme.palette.text.primary
    },
    extraToolbarTitle: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.1),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
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
        paddingBottom: theme.spacing(1),
    },


}));

export default function UserSection() {
    let {username} = useParams(); //todo simplify links and get username from cookies

    const classes = useStyles();

    const regexpUrlWithoutDrawer = new RegExp(`^${HomepageUrl}\/user\/[a-zA-Z0-9-]+\/(apps|new-app)`);
    const regexpUrlWithDrawer = new RegExp(`^${HomepageUrl}\/user\/[a-zA-Z0-9-]+\/app\/[a-zA-Z0-9-]+\/(dashboard|settings)`);

    const [notificationPopoverAnchor, setNotificationPopoverAnchor] = React.useState(null);
    const [profilePopoverAnchor, setProfilePopoverAnchor] = React.useState(null);

    const [isDrawerOpen, setDrawerOpen] = React.useState(false);

    //hide or show drawer and drawer menus
    const [isDrawerOnPage, setIsDrawerOnPage] = React.useState(false);

    const [notifications, setNotifications] = React.useState(undefined);
    const changeDrawerState = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    function logout() {
        setProfilePopoverAnchor(null);
        //todo logout
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

    function updateNotifications(notificationId, index){
        console.log("delete notification");
        console.log(notifications);
        let newNotifications = update(notifications, { $splice: [[index, 1]] } );
        console.log(newNotifications);
        setNotifications(newNotifications);
        deleteNotification(notificationId).then(result => console.log(result.status));
    }

    useEffect(() => {
        // todo load info by username
        console.log(username);
        console.log(getUserId(username));




        // todo load notifications from server
        /*const notifications = [
            {
                title: 'Уведомление 1',
                description: "Достаточно длинный текст первого уведомления",
                date: "21 Ноября 2020",
                new: true
            },
            {
                title: 'Уведомление 2',
                description: "Достаточно длинный текст второго уведомления",
                date: "15 Ноября 2020",
                new: false
            },
            {
                title: 'Уведомление 3',
                description: "Достаточно длинный текст третьего уведомления",
                date: "7 Ноября 2020",
                new: false
            }
        ];*/

        getNotifications(getUserId(username))
            .then(result=>{
                console.log("set notifications");
                setNotifications(result);
                //console.log(result);
            })
            .catch(error=>{
                console.log("error notifications");
                console.log(error);
            });




        // todo application route params
    }, []);

    let location = useLocation();
    React.useEffect(() => {
        // todo set isDrawerOnPage depending on page link
        let path = location.pathname;

        if (path.match(regexpUrlWithoutDrawer))
            setIsDrawerOnPage(false);
        else if (path.match(regexpUrlWithDrawer))
            setIsDrawerOnPage(true);
        else
            console.log('wrong apps url');
    }, [location]);

    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar variant="dense">
                    {isDrawerOnPage &&
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="change drawer state"
                        onClick={changeDrawerState}
                        className={classes.menuButton}
                    >
                        {isDrawerOpen ? <ArrowBackRoundedIcon/> : <MenuRoundedIcon/>}
                    </IconButton>}
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Multimarket Statistics
                    </Typography>

                    {/*todo show notifications menu on click*/}
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
                    {/* todo add button to mark notifications as viewed \ delete it */}
                    {notifications?.map((notification, index) => {
                        return (
                            <div key={notification.id}>
                                <div className={classes.popoverContainer}>
                                    <div className={classes.flex}>
                                        <Typography variant='body1' color={notification.isChecked ? 'primary' : 'inherit'}>
                                            {notification.title}
                                        </Typography>
                                        {notification.isChecked && <NewReleasesRounded color='primary'/>}
                                    </div>
                                    <Typography variant='body2'>{notification.text}</Typography>
                                    {/*<Typography variant='caption'>Удалить</Typography>*/}
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={()=>updateNotifications(notification.id, index)}
                                    >
                                        Удалить
                                    </Link>
                                </div>
                                {index !== (notifications.length - 1) && <Divider className={classes.fullWidth}/>}
                            </div>
                        );
                    })
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
                                Sc222 </Box>
                        </Typography>
                    </div>
                    <Divider className={classes.fullWidth}/>
                    <List dense>
                        {/* todo use repeating technique */}
                        <ListItem classes={{selected: classes.mainItemSelected}}
                                  className={classes.mainItem}
                                  onClick={() => setProfilePopoverAnchor(null)}
                                  button
                                  component={RouterLink}
                                  to={`${HomepageUrl}/user/${username}/apps`}
                        >
                            <ListItemText primary={'Приложения'}/>
                        </ListItem>
                        <ListItem classes={{selected: classes.mainItemSelected}}
                                  className={classes.mainItem}
                                  onClick={() => setProfilePopoverAnchor(null)}
                                  button
                                  component={RouterLink}
                                  to={`${HomepageUrl}/user/${username}/profile`}
                        >
                            <ListItemText primary={'Настройки'}/>
                        </ListItem>
                        <ListItem classes={{selected: classes.mainItemSelected}}
                                  className={classes.mainItem}
                                  onClick={() => logout()}
                                  button
                        >
                            <ListItemText primary={'Выйти'}/>
                        </ListItem>
                    </List>
                </div>
            </Popover>

            <main className={classes.content}>
                <RouteSwitch>
                    <Route path={`${HomepageUrl}/user/:username/apps`}>
                        <Applications username={username}/>
                    </Route>
                    <Route path={`${HomepageUrl}/user/:username/new-app`}>
                        <NewApplication username={username}/>
                    </Route>
                    <Route path={`${HomepageUrl}/user/:username/profile`}>
                        <Profile username={username}/>
                    </Route>
                    <Route path={`${HomepageUrl}/user/:username/app/:appname`}>
                        <ApplicationSection username={username} isDrawerOpen={isDrawerOpen}
                                            changeDrawerState={changeDrawerState}/>
                        {/*todo if path is /${HomepageUrl}/user/:username/app/:appname (without dashboard|settings) -> redirect to dashboard*/}
                    </Route>
                </RouteSwitch>
            </main>
        </div>
    );
}