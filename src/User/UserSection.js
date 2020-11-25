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

import {Route, Switch as RouteSwitch, useLocation, useParams} from 'react-router-dom';

//image imports
import demoProfile from '../images/demo_profile.png';
import {fade} from "@material-ui/core";
import {HomepageUrl} from "../App";
import Applications from "./Applications";
import Application from "./Application";
import NewApplication from "./NewApplication";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    appBarSpacer: {
        height: '48px'
    },

    root: {
        display: 'flex',
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

}));

export default function UserSection() {
    let {username} = useParams(); //todo simplify links and get username from cookies

    const classes = useStyles();

    const regexpUrlWithoutDrawer = new RegExp(`^${HomepageUrl}\/user\/[a-zA-Z0-9-]+\/(apps|new-app)`);
    const regexpUrlWithDrawer = new RegExp(`^${HomepageUrl}\/user\/[a-zA-Z0-9-]+\/app\/[a-zA-Z0-9-]+\/(dashboard|settings)`);

    const [isDrawerOpen, setDrawerOpen] = React.useState(true);

    //hide or show drawer and drawer menus
    const [isDrawerOnPage, setIsDrawerOnPage] = React.useState(false);

    const [notifications, setNotifications] = React.useState(undefined);
    const changeDrawerState = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        // todo load info by username
        console.log(username);

        // todo load notifications from server
        setNotifications(['1', '2']);

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
                    <IconButton color="inherit">
                        <Badge badgeContent={notifications?.length} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>

                    {/*todo load profile picture from server*/}
                    <IconButton className={classes.profileIconButton} color='inherit'>
                        <Avatar className={classes.profileIcon} alt='Profile picture' src={demoProfile}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>

                <RouteSwitch>
                    <Route path={`${HomepageUrl}/user/:username/apps`}>
                        <Applications username={username}/>
                    </Route>
                </RouteSwitch>

                <RouteSwitch>
                    <Route path={`${HomepageUrl}/user/:username/new-app`}>
                        <NewApplication username={username}/>
                    </Route>
                </RouteSwitch>

                <RouteSwitch>
                    <Route path={`${HomepageUrl}/user/:username/app/:appname`}>
                        <Application username={username} isDrawerOpen={isDrawerOpen}/>
                        {/*todo if path is /${HomepageUrl}/user/:username/app/:appname (without dashboard|settings) -> redirect to dashboard*/}
                    </Route>
                </RouteSwitch>
            </main>
        </div>
    );
}